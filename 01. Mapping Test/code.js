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

  return masterfileID;
}
