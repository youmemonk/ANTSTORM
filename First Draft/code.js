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
var name1 = 'BU';
var name2= 'random'; 
// var name3 = ['file1', 'file2', 'file3'];
  for(var i=0; i<checkedID.length; i++){

    // DriveApp.getFileById(checkedID[i][0]).makeCopy(name1+ ' | '+name2+ ' | '+ "name",DriveApp.getFolderById(targetFolderID));
    DriveApp.getFileById(checkedID[i][0]).makeCopy(DriveApp.getFolderById(targetFolderID));
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

  //! Retrieve Row Values
  for (var rowIndex = 2; rowIndex <= lastRow; rowIndex++) {
    var colStartIndex = 1;
    var rowNum = 1;
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum,
      sheet.getLastColumn());
    var values = range.getValues();
    // rowValues.push(values[0]);

    // Logger.log(values[0][3]);
    // if(colStartIndex == 3){
    //   rowValues.push("apple")
    // }
    // else{
    //   rowValues.push(values[0][3]);
    // }

    rowValues.push(values[0]);  

    // var valueIndex = 0;
    // for(var valueIndex =0; valueIndex<values[0].length; valueIndex++){
    //   var url = sheet.getRange([`D${valueIndex+1}`]).getRichTextValue().getLinkUrl();
    //   if(valueIndex == 3){
    //     // rowValues.push("apple");
    //     rowValues.push(url)
    //   }
    //   else{
    //     rowValues.push(values[0][valueIndex]);
    //   }
    // }
  }

  var sheetName = "Sheet1";
  var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";
  var book = SpreadsheetApp.openById(sheetId);
  var sheet = book.getSheetByName(sheetName);

  // Logger.log(rowValues[0])

  for(var i=0; i<rowValues.length; i++){
  var url = sheet.getRange([`D${i+2}`]).getRichTextValue().getLinkUrl();  

  rowValues[i][3] = url;
  // Logger.log(url)
  }

  // Logger.log(rowValues);
  

  // var sheetName = "Sheet1";
  // var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";
  // var book = SpreadsheetApp.openById(sheetId);
  // var sheet = book.getSheetByName(sheetName);

     // var i = 22;
    // var url = sheet.getRange([`D${i}`]).getRichTextValue().getLinkUrl();
    // var url = sheet.setActiveRangeList(range).getRichTextValue().getLinkUrl();
    // Logger.log(range);

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

  // Logger.log(jsonArray);

  return jsonArray;
}