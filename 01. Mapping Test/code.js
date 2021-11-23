function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
//! Original Cycle Function
// function cycle(cycleParam){
//   //? Select Delivery/Sales
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
//   Logger.log((chosenCycleFolderId))
//   return chosenCycleFolderId;
// }

//! New Cycle Function to also get names
function cycle(cycleParam){
  //? Select Delivery/Sales
  // var cycleParam = "Consulting"
  var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
  var cyclefolder = DriveApp.getFolderById(cycleFolderID);
  var cyclelist = cyclefolder.getFolders();

  var chosenCycleFolderId = {}
  while(cyclelist.hasNext()){
    var tempCycle = cyclelist.next();
    if(tempCycle.getName().includes(cycleParam)){
      chosenCycleFolderId[cycleParam] = tempCycle.getId();
      break;
    }
  }
  // Logger.log(Object.values(chosenCycleFolderId)[0]);
  // Logger.log((chosenCycleFolderId))

  //! For getting the Name list
  var businessfolder = DriveApp.getFolderById(Object.values(chosenCycleFolderId)[0]);
  var BUlist = businessfolder.getFolders();
  var BUnames = [];
  while (BUlist.hasNext()) {
    var tempBU = BUlist.next();
    BUnames.push(tempBU.getName());
    // return 0;
  }
  //! Getting the options list, feed back into the html end
  var temp = [];
  for (var i = 0; i < BUnames.length; i++) {
    temp.push(BUnames[i].split(" ")[0]);
  }


  // return (chosenCycleFolderId ,temp);
  return [chosenCycleFolderId, temp];
  // Logger.log(Object.values(chosenCycleFolderId))
  // Logger.log(temp)
  // return ;
}

//! Delivery -> Business Folder -> Master Sheet -> Get ID
function mastersheetLocation(buParam, folderId){
  //? Delivery/Consulting to Business Unit(BU) Folder
  // var parentFolderID = '19QA8tlwnEGsMlgrE1K5n2GvZhRk5ZspA';
  var parentFolderID = folderId;
  var businessfolder = DriveApp.getFolderById(parentFolderID);
  var BUlist = businessfolder.getFolders();
  // var BUnames = [];
  //! Select individual BU
  var chosenBUFolderId ={}
  while(BUlist.hasNext()){
    var tempBU = BUlist.next();
    // BUnames.push(tempBU.getName());

    if(tempBU.getName().includes(buParam)){
      chosenBUFolderId[buParam] = tempBU.getId();
      break;
    }
  }

  // Logger.log(BUnames);
  //? Business Folder to Get Sheet & Sheet ID
  //! Get templates sheet id 
  var BUFolder = DriveApp.getFolderById(Object.values(chosenBUFolderId)[0]);
  var masterfiles = BUFolder.getFiles();
  var masterfile = masterfiles.next();
  var masterfileID = masterfile.getId();
  // Logger.log(masterfileID);

  return masterfileID;
}


