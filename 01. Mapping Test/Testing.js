// function mastersheetLocation(buParam, folderId) {
//   //? Delivery/Consulting to Business Unit(BU) Folder
//   var parentFolderID = "19QA8tlwnEGsMlgrE1K5n2GvZhRk5ZspA";

//   var businessfolder = DriveApp.getFolderById(parentFolderID);
//   var BUlist = businessfolder.getFolders();
//   var BUnames = [];
//   while (BUlist.hasNext()) {
//     var tempBU = BUlist.next();
//     BUnames.push(tempBU.getName());
//     // return 0;
//   }
//   //! Getting the options list, feed back into the html end
//   var temp = [];
//   for (var i = 0; i < BUnames.length; i++) {
//     temp.push(BUnames[i].split(" ")[0]);
//   }
//   // Logger.log(temp);
// }

// function cycle(cycleParam){
//   //? Select Delivery/Sales
//   var cycleParam = "Consulting"
//   var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
//   var cyclefolder = DriveApp.getFolderById(cycleFolderID);
//   var cyclelist = cyclefolder.getFolders();

//   var chosenCycleFolderId = {}
//   while(cyclelist.hasNext()){
//     var tempCycle = cyclelist.next();
//     if(tempCycle.getName().includes(cycleParam)){
//       chosenCycleFolderId[cycleParam] = tempCycle.getId();
//       break;
//     }
//   }
//   // Logger.log((chosenCycleFolderId))

//   //! For getting the Name list
//   var businessfolder = DriveApp.getFolderById(Object.values(chosenCycleFolderId)[0]);
//   var BUlist = businessfolder.getFolders();
//   var BUnames = [];
//   while (BUlist.hasNext()) {
//     var tempBU = BUlist.next();
//     BUnames.push(tempBU.getName());
//     // return 0;
//   }
//   //! Getting the options list, feed back into the html end
//   var temp = [];
//   for (var i = 0; i < BUnames.length; i++) {
//     temp.push(BUnames[i].split(" ")[0]);
//   }
//   // Logger.log(temp);

//   return chosenCycleFolderId;
// }