function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

//! Global Links for Master Sheets
var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";
var productSheetID = "1hk2wyK0fYitlmz3ag39NffusLU_VKEAzac-qBQeOYrI";

function RootFolderMapping() {
  //! For Root Folder Mapping
  var sheetName = "Sheet1";
  var book = SpreadsheetApp.openById(rootSheetID);
  var sheet = book.getSheetByName(sheetName);
  var rootdata = arrayToJSONObject(sheet.getDataRange().getValues());

  //! For BU Name Mapping
  var busheetName = "Shared Drive Mapping";
  var bubook = SpreadsheetApp.openById(productSheetID);
  var buSheet = bubook.getSheetByName(busheetName);
  var buData = arrayToJSONObject(buSheet.getDataRange().getValues());

  //! For Product Mapping
  var productname = "Product Mapping";
  var productSheet = bubook.getSheetByName(productname);
  var productData = arrayToJSONObject(productSheet.getDataRange().getValues());

  //! For Region Mapping
  var regionname = "Region List";
  var regionSheet = bubook.getSheetByName(regionname);
  var regionData = arrayToJSONObject(regionSheet.getDataRange().getValues());

  Logger.log(regionData);

  return [rootdata, buData, productData, regionData];
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
  var sheetId = id;
  var book = SpreadsheetApp.openById(sheetId);

  //! Get Sheet Name
  var list = [];
  for (var i = 0; i < book.getSheets().length; i++) {
    list.push(book.getSheets()[i].getName());
  }
  //! Sheetname with .include('Assets Master')
  var sheetName;
  for (var i = 0; i < list.length; i++) {
    if (list[i].includes("Assets Master")) {
      sheetName = list[i];
      break;
    }
  }

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
