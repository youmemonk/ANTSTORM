// // function myFunction() {
// //   // const fileId = '1Q8gnjmhrr-Awn12zXdREcemn8kOMTFdw9RPJbXtQQUg'
// //   var fileId = '1SXrZo1dRg5ixrHWK_LymemTQOVxACJ2RXjmD6cAnyVY'
// //   // var targetFolderId = '1gwEpngbrTzT7wzwD3m_6qFG8lATC5jN1'
// //   var targetFolderId = '17v_Oi3EpTCm1WEkJXKWEy2qGMSw54qDO'

// //   // const fileId = "###";  // Please set the file ID.

// //   // var newURL = DriveApp.getFileById(fileId).makeCopy(DriveApp.getFolderById(targetFolderId)).getUrl();
// //   // var newID = newURL.match(/[-\w]{25,}/);
// //   DriveApp.getFileById(fileId).revokePermissions('mayank.ukey@searce.com')
// //   DriveApp.getFileById(fileId).addViewer('mayank.ukey@searce.com')

// //   // const url = "https://www.googleapis.com/drive/v3/files/" + fileId;
// //   // const res = UrlFetchApp.fetch(url, {
// //   //   method: "patch",
// //   //   headers: {authorization: "Bearer " + ScriptApp.getOAuthToken()},
// //   //   contentType: "application/json",
// //   //   payload: JSON.stringify({copyRequiresWriterPermission:true, writersCanShare: false, viewersCanCopyContent: false}),
// //   // });
// //   // Logger.log(res.getContentText())
// // }
// function domainExtract(){
//   // var url = 'www.google.co.in'
//   // var url = 'josh.meatmarket.co.uk'
//   // var url = 'support.google.com'
//   // var url = 'http://support.mail.kirloskarcap.in'

//   var url = ['http://iciciprulife.com', 'http://logically.co.uk', 'http://bizzy.co.id', 'http://bharatpe.com', 'http://flygofirst.com', 'http://faces-india.com', 'http://titan.co.in', 'http://support.mail.kirloskarcap.in']

//     var sheetName = "Repo API Logs"; //! CHANGE
//     var book = SpreadsheetApp.openById('1k7Qmi-vqNzUpk0ukO6R3I2HC4xXiSjLv5nkPpLpTbRM');
//     var sheet = book.getSheetByName(sheetName);
//     var masterSheetData = sheet.getDataRange().getValues();
//     // Logger.log(masterSheetData)

//   // var reg = new RegExp ('(\w{2,}\.\w{2,3}\.\w{2,3}|\w[A-Za-z0-9-_]{2,}\.\w{2,3})$')
//   var reg = /(\w{2,}\.\w{2,3}\.\w{2,3}|\w[A-Za-z0-9-_]{2,}\.\w{2,3})$/
//   // var reg = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img
//   // var reg = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
//   // var loggingThing = url.match(reg)
//   // Logger.log(loggingThing[0].split('.')[1])
//   // Logger.log(reg.test(url[1]))
//   // Logger.log(url[1].match(reg))
//   for(var i=1; i<masterSheetData.length; i++){
//     Logger.log(masterSheetData[i][7].match(reg)[0])
//     // Logger.log(masterSheetData[i][7].match(reg).split('.')[0])
//   }

//   // for (var i in url){
//   //     var match
//   //     if (match = url[i].match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
//   //           result = match[1]
//   //           Logger.log(result)
//   //           if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
//   //               result = match[0]
//   //           }
//   //       }
//   //     Logger.log(result)
//   // }

// }
