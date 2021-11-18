function doGet() {
    return HtmlService.createHtmlOutputFromFile("index");
  }
  
  function fetchData(){
    var sheetName = "Sheet1";
    var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";
  
    var book = SpreadsheetApp.openById(sheetId);
    var sheet = book.getSheetByName(sheetName);
  
    // var data = sheet.getDataRange().getValues();
    var data1 = sheet.getRange(1, 1, sheet.getLastRow()).getValues();
    var data2 = sheet.getRange(1, 2, sheet.getLastRow()).getValues();
    var data3 = sheet.getRange(1, 3, sheet.getLastRow()).getValues();
    var data4 = sheet.getRange(1, 4, sheet.getLastRow()).getValues();
    var data5 = sheet.getRange(1, 5, sheet.getLastRow()).getValues();
    var data6 = sheet.getRange(1, 6, sheet.getLastRow()).getValues();
    
    Logger.log(sheetdata);
  }
  
  function getSpreadSheetColumns(sheetName, c){
    var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    return ss.getRange(1, c, ss.getLastRow()).getValues();
  }