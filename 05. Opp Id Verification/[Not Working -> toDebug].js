//! ------------------------ DATA CODE -------------------------
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

//! Global Links for Master Sheets
var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";
var productSheetID = "1hk2wyK0fYitlmz3ag39NffusLU_VKEAzac-qBQeOYrI";
var docLogoMapping = "1-uEczP2SST68xvYWpq5Hp2fHlHpHAS-wlitiJKnwN8c";
var logsSheet = "1HlasqxpVjIhnzcydDuJXxEG9iOvFWI72wlKwnhC9U_g";

//Fetch data from rootMasterSheet and BU name, product name, region name frommapping sheet
function rootFolderMapping() {
  Logger.log("wroo");
  // //! For Root Folder Mapping
  // var sheetName = "Sheet1";
  // var book = SpreadsheetApp.openById(rootSheetID);
  // var sheet = book.getSheetByName(sheetName);
  // var rootdata = arrayToJSONObject(sheet.getDataRange().getValues());

  //! For Root Folder Mapping with excluding empty values
  var sheetName = "Sheet1";
  var book = SpreadsheetApp.openById(rootSheetID);
  var sheet = book.getSheetByName(sheetName);
  var masterSheetData = sheet.getDataRange().getValues();
  var cleanedMasterSheetData = [];
  for (var i = 0; i < masterSheetData.length; i++) {
    if (masterSheetData[i][1]) {
      cleanedMasterSheetData.push(masterSheetData[i]);
    }
  }
  var rootdata = arrayToJSONObject(cleanedMasterSheetData);

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

  //! For Document logo Mapping
  var logoSheetName = "Sheet1";
  var logobook = SpreadsheetApp.openById(docLogoMapping);
  var logoSheet = logobook.getSheetByName(logoSheetName);
  var logoData = arrayToJSONObject(logoSheet.getDataRange().getValues());

  //! For fetching repo apo logs(Verification of opp id)
  var sheetName = "Repo API Logs";
  var book = SpreadsheetApp.openById(logsSheet);
  var sheet = book.getSheetByName(sheetName);
  var repoLogsData = arrayToJSONObject(sheet.getDataRange().getValues());
  Logger.log(repoLogsData);

  // Logger.log(logoData);

  return [rootdata, buData, productData, regionData, logoData, repoLogsData];
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

//! ------------------------ CREATE TEMPLATE CODE -------------------------

//Create template
var idList = [];

var index = 0;
var flag = false;
var newTemplateUrls = [];
var name = "";

function createTemplate(bt) {
  // for(var i=0)
  // a = [1,2]
  for (var i = 0; i < bt[1].length; i++) {
    idList.push(bt[1][i]);
  }

  var idList = bt[1];
  var targetFolderID = bt[0]["Folder ID"];
  // var targetFolderID = '1Phgfh1kP0TJH0niKoDewI6ruHvrOTqiX';
  var docUrl = [];
  var fullname = "";
  var docName = "";
  var domainName = bt[0]["Domain Name"].split(".")[0];
  // domainName.split('.')

  var driveStorageItems = [];
  var xy;

  // // //! Getting the File Names & URLs present in the drive
  var pp = DriveApp.getFolderById(targetFolderID).getFiles();
  var driveFileList = [];
  while (pp.hasNext()) {
      xy = pp.next()
    // var tempCycle = random.next();
    driveFileList.push([xy, xy.getUrl()]);
  }

  for (var i = 0; i < idList.length; i++) {
    index = 0;
    flag = false;
    fullname = "";
    docName = ""; //clear DocName
    docName = idList[i]["Document Name & Link"];
    docUrl.push(idList[i]["Document Link"].match(/[-\w]{25,}/));
    // docProduct.push(idList[i]["Product"]);
    name = domainName.toUpperCase() + " | " + idList[i]["Product"] + " | " + docName;

    //! Search for existing files in drive, if any present
    //! drivefilelist -> name and urls of currently exisiting doucments
    for (var j = 0; j < driveFileList.length; j++) {
      if (name == driveFileList[j][0]) {
        index = j;
        flag = true;
        break;
      }
      // else{
      //   index++;
      // }
    }

    // if(flag == true){
    //   //-> index se file url utha lo
    //   newTemplateUrls.push(driveFileList[index][1])
    // }
    // else{
    newTemplateUrls.push(
      DriveApp.getFileById(docUrl[i])
        .makeCopy(name, DriveApp.getFolderById(targetFolderID))
        .getUrl()
    );
    // }
  }

  // DriveApp.getFileById(docUrl[i]).makeCopy(name, DriveApp.getFolderById(targetFolderID));
  // }
  // Logger.log(idList);
  return driveFileList;
}

// // Fetch Repo API logs sheet and converts to json
// function fetchAPILogs(){
//   // var logsSheet = '1k7Qmi-vqNzUpk0ukO6R3I2HC4xXiSjLv5nkPpLpTbRM'
//   var sheetName = "Repo API Logs";
//   var book = SpreadsheetApp.openById(logsSheet);
//   var sheet = book.getSheetByName(sheetName);
//   var repoLogsData = arrayToJSONObject(sheet.getDataRange().getValues());
//   Logger.log(repoLogsData)
//   // for(var i=0; i<logsData.length;i++){
//   //   Logger.log(logsData[i]['Opportunity ID'])
//   // }

// }
