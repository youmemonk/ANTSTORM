// var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";

// function RootFolderMapping1() {
//   //! For Root Folder Mapping
//   var sheetName = "Sheet1";
//   var book = SpreadsheetApp.openById(rootSheetID);
//   var sheet = book.getSheetByName(sheetName);
//   var masterSheetData = sheet.getDataRange().getValues()
//   var cleanedMasterSheetData = []
//   for(var i=0; i<masterSheetData.length; i++){
//     if(masterSheetData[i][1]){
//       cleanedMasterSheetData.push(masterSheetData[i])
//     }
//   }
//   var rootdata = arrayToJSONObject(cleanedMasterSheerData);
//   Logger.log(rootdata.length)
// }

//   function arrayToJSONObject(fileList) {
//     //header
//     var keys = fileList[0];

//     //vacate keys from main array
//     var newArr = fileList.slice(1, fileList.length);

//     var formatted = [],
//       data = newArr,
//       cols = keys,
//       l = cols.length;
//     for (var i = 0; i < data.length; i++) {
//       var d = data[i],
//         o = {};
//       for (var j = 0; j < l; j++) o[cols[j]] = d[j];
//       formatted.push(o);
//     }
//     return formatted;
//   }
