function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

// var cyclelist = ['apple'];

//! Delivery -> Business Folder -> Master Sheet -> Get ID
function mastersheetLocation(name2) {
  //? Delivery/Sales to Business Folder
  var parentFolderID = "19QA8tlwnEGsMlgrE1K5n2GvZhRk5ZspA";
  var businessfolder = DriveApp.getFolderById(parentFolderID);
  var BUlist = businessfolder.getFolders();
  var BUnames = [];
  while (BUlist.hasNext()) {
    var folder = BUlist.next();
    BUnames.push(folder.getId());
  }
  // Logger.log(BUnames);

  //? Business Folder to Get Sheet & Sheet ID
  var BUID = BUnames[2];
  var BUFolder = DriveApp.getFolderById(BUID);
  var masterfiles = BUFolder.getFiles();
  var masterfile = masterfiles.next();
  var masterfileID = masterfile.getId();
  // Logger.log(masterfileID);

  cycle();
  // Logger.log(cyclelist);

  function cycle(name1) {
    //? Select Delivery/Sales
    var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
    var cyclefolder = DriveApp.getFolderById(cycleFolderID);
    var cyclelist = cyclefolder.getFolders();
    var cyclenames = [];
    while (cyclelist.hasNext()) {
      var temp = cyclelist.next();
      cyclenames.push(temp.getName());
    }

    Logger.log(cyclenames);
  }
}

// function cycle(name1){
//   //? Select Delivery/Sales
//   var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
//   var cyclefolder = DriveApp.getFolderById(cycleFolderID);
//   var cyclelist = cyclefolder.getFolders();
//   var cyclenames = [];
//   while(cyclelist.hasNext()){
//     var temp = cyclelist.next();
//     cyclenames.push(temp.getName());
//   }

//   // Logger.log(cyclenames);
// }
