function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

//! Cycle Function to get folder id and BU list of subfolders
function cycle(cycleParam) {
  //? Select Delivery/Consulting
  // var cycleParam = "Consulting"
  var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
  var cyclefolder = DriveApp.getFolderById(cycleFolderID);
  var cyclelist = cyclefolder.getFolders();

  var chosenCycleFolderId = {};
  while (cyclelist.hasNext()) {
    var tempCycle = cyclelist.next();
    if (tempCycle.getName().includes(cycleParam)) {
      chosenCycleFolderId[cycleParam] = tempCycle.getId();
      break;
    }
  }
  //! Get BU subfolder Name list
  var businessfolder = DriveApp.getFolderById(
    Object.values(chosenCycleFolderId)[0]
  );
  var BUlist = businessfolder.getFolders();
  var BUnames = [];
  while (BUlist.hasNext()) {
    var tempBU = BUlist.next();
    BUnames.push(tempBU.getName());
  }
  //! Split folder name to BU short name
  var buSplitList = [];
  for (var i = 0; i < BUnames.length; i++) {
    buSplitList.push(BUnames[i].split(" ")[0]);
  }

  return [chosenCycleFolderId, buSplitList];
}

//! Delivery -> Business Folder -> Master Sheet -> Get ID
function mastersheetLocation(buParam, folderId) {
  //? Delivery/Consulting to Business Unit(BU) Folder
  // var parentFolderID = '19QA8tlwnEGsMlgrE1K5n2GvZhRk5ZspA';
  var parentFolderID = folderId;
  var businessfolder = DriveApp.getFolderById(parentFolderID);
  var BUlist = businessfolder.getFolders();
  //! Select individual BU
  var chosenBUFolderId = {};
  while (BUlist.hasNext()) {
    var tempBU = BUlist.next();

    if (tempBU.getName().includes(buParam)) {
      chosenBUFolderId[buParam] = tempBU.getId();
      break;
    }
  }

  //? Business Folder to Get Sheet & Sheet ID
  //! Get templates sheet id
  var BUFolder = DriveApp.getFolderById(Object.values(chosenBUFolderId)[0]);
  var masterfiles = BUFolder.getFiles();
  var masterfile = masterfiles.next();
  var masterfileID = masterfile.getId();
  // Logger.log(masterfileID);

  var json = fetchData(masterfileID);
  return json;
}

function fetchData(mastersheetID) {
  // var sheetId = "1Ais-7oPMCR_C2rNJgGsiPIeXXejXMazy0gMbLP9DFXg";
  // var sheetId = "1Ais-7oPMCR_C2rNJgGsiPIeXXejXMazy0gMbLP9DFXg";
  var sheetId = mastersheetID;
  var book = SpreadsheetApp.openById(sheetId);

  //! Get Sheet Name
  var list = [];
  for (var i = 0; i < book.getSheets().length; i++) {
    list.push(book.getSheets()[i].getName());
  }
  //! Hardcoded Sheetname here
  var sheetName = list[0];

  var sheet = book.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();

  //! Get Urls
  var urlList = ["Document Link"];
  for (var i = 1; i < values.length; i++) {
    var url = sheet
      .getRange(`B${i + 1}`)
      .getRichTextValue()
      .getLinkUrl();
    urlList.push(url);
  }

  var fileList = [];
  //! Merge urls and Sheet Data into Filelist
  for (var i = 0; i < values.length; i++) {
    fileList.push(values[i].concat(urlList[i]));
  }

  //! Filelist to JSON object
  // var startTime = (new Date()).getTime()
  var data = arrayToJSONObject(fileList);
  Logger.log(data);
  // var endTime = (new Date()).getTime()
  // Logger.log(`Call to Arraywala took ${endTime - startTime} milliseconds`)

  //! Data has sheet data + url links
  return data;
}

function arrayToJSONObject(fileList) {
  //header
  var keys = fileList[0];

  //vacate keys from main array
  var newArr = fileList.slice(1, fileList.length);

  var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
  for (var i = 0; i < data.length; i++) {
    var d = data[i],
      o = {};
    for (var j = 0; j < l; j++) o[cols[j]] = d[j];
    formatted.push(o);
  }
  return formatted;
}
