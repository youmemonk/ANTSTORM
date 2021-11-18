function doGet() {
    return HtmlService.createHtmlOutputFromFile("index");
  }
  
  // function doSomething() {
  //   Logger.log("code running");
  // }
  
  
  function fetchData(){
    var sheetName = "Sheet1";
    var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";
    var book = SpreadsheetApp.openById(sheetId);
  
    var sheet = book.getSheetByName(sheetName);
    // var range = sheet.getRange("D2:D23");
  
    //! Get Hyperlinked URLs from individual Cells
    // var i = 22;
    // var url = sheet.getRange([`D${i}`]).getRichTextValue().getLinkUrl();
    // var url = sheet.setActiveRangeList(range).getRichTextValue().getLinkUrl();
    // Logger.log(range);
  
    //! Get Hyperlink URLs in a Array
    // var urlList = [];
    // for(var i=2; i<23; i++){
    // var url = sheet.getRange([`D${i}`]).getRichTextValue().getLinkUrl();
    // urlList.push(url);
    // }
  
    // Logger.log(urlList);
    // Logger.log(sheet[0]);
  
    // Logger.log(JSON.stringify(sheet));
  
    var json = convertSheet2JsonText(sheet);
    // Logger.log(json);
    return json;
  }
  
  // function fetchData() {
  //   var sheetName = "Sheet1";
  //   var sheetId = "1moHFCyeeZDUIyYYCXfMaLJwnpxYu4eMStottyhrFpV8";
  
  //   var book = SpreadsheetApp.openById(sheetId);
  //   var sheet = book.getSheetByName(sheetName);
  
  //   var json = convertSheet2JsonText(sheet);
  //   // Logger.log(sheet);
  
  //   // var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  //   // var url = sheet.getRange("A2").getRichTextValue().getLinkUrl(); //removed empty parentheses after getRange in line 2
  
  //   return json;
  //   // return sheet;
  // }
  
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
      var range = sheet.getRange(
        rowIndex,
        colStartIndex,
        rowNum,
        sheet.getLastColumn()
      );
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