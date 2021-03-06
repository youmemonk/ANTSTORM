function fetchData() {
  var sheetId = "1Ais-7oPMCR_C2rNJgGsiPIeXXejXMazy0gMbLP9DFXg";
  var sheetName = "SE | Delivery Assets";
  var book = SpreadsheetApp.openById(sheetId);
  var sheet = book.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();

  var urlList = ["Document Link"];
  for (var i = 1; i < values.length; i++) {
    var url = sheet
      .getRange(`B${i + 1}`)
      .getRichTextValue()
      .getLinkUrl();
    urlList.push(url);
  }

  var fileList = [];
  for (var i = 0; i < values.length; i++) {
    fileList.push(values[i].concat(urlList[i]));
  }
  Logger.log(arrayToJSONObject(fileList));
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
