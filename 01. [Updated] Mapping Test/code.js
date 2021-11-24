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
