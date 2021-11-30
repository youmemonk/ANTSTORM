
// function arrayToJSONObject(fileList) {
//   //header
//   var keys = fileList[0];

//   //vacate keys from main array
//   var newArr = fileList.slice(1, fileList.length);

//   var formatted = [],
//     data = newArr,
//     cols = keys,
//     l = cols.length;
//   for (var i = 0; i < data.length; i++) {
//     var d = data[i],
//       o = {};
//     for (var j = 0; j < l; j++) o[cols[j]] = d[j];
//     formatted.push(o);
//   }
//   return formatted;
// }

// var newTemplateUrls = [];
// var docUrl = []
// var name = ""

// function temp(){
//   // var targetFolderID = bt[0]["Folder ID"];
//   var targetFolderID = '12Z-CbJ4olWXW0RmSc0Q2A4D9kcdC5sUZ';
  
//   var driveFileList = [[`LOGICALLY | GCP | Meeting Minutes`, `https://docs.google.com/document/d/1cnerHR7MEMfqHSBwf5oUCcGzjHrSoOuReqp7lbWvfjs/edit?usp=drivesdk`], [`LOGICALLY | Chrome | Deployment Introduction Email`, `https://docs.google.com/spreadsheets/d/16aDJgsdiFR2H0ME15k4n1qpjaXPF3SFDcKKhW5fvV34/edit?usp=drivesdk`], [`logically | GCP | Project Plan`, `https://docs.google.com/document/d/1ZSyzgKtqqjQHdVdkCRW3f4VmCfoY2j37KE7OdHHjFS4/edit?usp=drivesdk`], [`LOGICALLY | AWS | Case Study`, `https://docs.google.com/presentation/d/1Nu03yGJChDlqHFgw-rxcCYvb-4imQod-1uAtllOIfdI/edit#slide=id.p`]];

//   var tempArray = [['Document Description', 'Document Link', 'Document Name & Link', 'Product', 'Region'], ['Template to document customer Case study', 'https://docs.google.com/presentation/d/1AvEV9tJdtGMVMcu4yO_Up9cPQdn9bU94kzF6wmU_Wao/edit#slide=id.p', 'Case Study', 'AWS', 'All']]

//   var idList = arrayToJSONObject(tempArray)
  
//   // //! Getting the File Names & URLs present in the drive
//   // var pp = DriveApp.getFolderById(targetFolderID).getFiles();
//   // var driveFileList = [];
//   // while (pp.hasNext()) {
//   //   // var tempCycle = random.next();
//   //   driveFileList.push([pp.next(), pp.next().getUrl()])
//   // }

//   for (var i = 0; i < idList.length; i++) {
//     index = 0;
//     flag = false;
//     fullname = "";
//     docName = ""; //clear DocName
//     docName = idList[i]["Document Name & Link"];
//     docUrl.push(idList[i]["Document Link"].match(/[-\w]{25,}/));
//     // docProduct.push(idList[i]["Product"]);
//     var domainName = "LOGICALLY"
//     name = domainName.toUpperCase() + " | " + idList[i]["Product"] + " | " + docName;

//       //! Search for existing files in drive, if any present
//       //! drivefilelist -> name and urls of currently exisiting doucments
//       for(var j=0; j<driveFileList.length; j++){ 
//         // Logger.log(driveFileList[j][0])
//         // Logger.log(name)

//         if(name == driveFileList[j][0]){
//           index = j;
//           flag = true;
//           break;
//         }
//         // else{
//         //   index++;
//         // }
//       }
//       Logger.log(flag)

//       if(flag == true){
//         //-> index se file url utha lo
//         newTemplateUrls.push(driveFileList[index][1])
//       }
//       else{
//         newTemplateUrls.push(
//               DriveApp.getFileById(docUrl[i]).makeCopy(name, DriveApp.getFolderById(targetFolderID)).getUrl()
//             );
//       }

//     Logger.log(newTemplateUrls)
// }
// }
