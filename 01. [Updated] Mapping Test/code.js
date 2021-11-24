function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

//! Global Links for Master Sheets
//? Root Folder for Template Repo: 0AK1U4yt0u5qcUk9PVA
var rootFolderID = "0AK1U4yt0u5qcUk9PVA";
var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";

function RootFolderMapping() {
  var sheetName = "Sheet1";
  var book = SpreadsheetApp.openById(rootSheetID);
  var sheet = book.getSheetByName(sheetName);

  // Logger.log(sheet.getDataRange().getValues())
  var data = arrayToJSONObject(sheet.getDataRange().getValues());
  // return json;

  Logger.log(data);
  // Logger.log(sheet.getDataRange().getValues());

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

function fetchData(id) {
  // var sheetId = "1Ais-7oPMCR_C2rNJgGsiPIeXXejXMazy0gMbLP9DFXg";
  // var sheetId = "1Ais-7oPMCR_C2rNJgGsiPIeXXejXMazy0gMbLP9DFXg";
  var sheetId = id;
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
