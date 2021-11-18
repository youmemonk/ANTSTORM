function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function doSomething(){
  Logger.log('code running')
}

function execute(checkedID){
  Logger.log('working')

  // var targetFolderID = '1JGids9srowkWekj0e3ru87PW7XxhgW7C';
  // var targetFolderID = '1Di1luMkvY2uxz6Rae8KeuDW80foEAHmZ';
  var targetFolderID='10ap5wJPZ9nsR633bV7QUk_fO_dlAeWCg';
  // var sheetID = '1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8'

  // var document = DocumentApp.create("New Document")
var name1 = 'WM';
var name2= 'flipkart'; 
var name3 = ['MOM', 'mom1', 'mom2'];
  for(var i=0; i<checkedID.length; i++){

    DriveApp.getFileById(checkedID[i][0]).makeCopy(name1+ ' | '+name2+ ' | '+name3[i],DriveApp.getFolderById(targetFolderID));
  }
  // DriveApp.getFileById(document.getId()).crea("Copied File", targetFolderID)
}

//Fetch data from sheet
function fetchData() {

  var sheetName = "Sheet1";
  var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";

  var book = SpreadsheetApp.openById(sheetId);
  var sheet = book.getSheetByName(sheetName);

  var json = convertSheet2JsonText(sheet);
  // var data = JSON.stringify(json)

  // var data = ContentService
  //     .createTextOutput(JSON.stringify(json))
  //     .setMimeType(ContentService.MimeType.JSON)

  return json;
}

function convertSheet2JsonText(sheet) {
  var colStartIndex = 1;
  var rowNum = 1;
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRange.getValues();
  var titleColumns = firstRowValues[0];

  // after the second line(data)
  var lastRow = sheet.getLastRow();
  var rowValues = [];
  for (var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {
    var colStartIndex = 1;
    var rowNum = 1;
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum,
      sheet.getLastColumn());
    var values = range.getValues();
    rowValues.push(values[0]);
  }

  // create json
  var jsonArray = [];
  for (var i = 0; i < rowValues.length; i++) {
    var line = rowValues[i];
    var json = new Object();
    for (var j = 0; j < titleColumns.length; j++) {
      json[titleColumns[j]] = line[j];
    }
    jsonArray.push(json);
  }
  return jsonArray;
}