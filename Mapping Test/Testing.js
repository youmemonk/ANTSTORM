function splittest() {
  var filename = [];
  filename.push("Template | Delivery");
  filename.push("Template | Consulting");

  for (var i = 0; i < filename.length; i++) {
    filename[i] = filename[i].split(" ")[2];
  }

  Logger.log(filename);
}

function pro(name1) {
  //? Select Delivery/Sales
  var cycleFolderID = "0AK1U4yt0u5qcUk9PVA";
  var cyclefolder = DriveApp.getFolderById(cycleFolderID);
  var cyclelist = cyclefolder.getFolders();
  var cyclenamelist = [];
  var cycleFolderIDlist = [];
  while (cyclelist.hasNext()) {
    var temp = cyclelist.next();
    cyclenamelist.push(temp.getName());
    cycleFolderIDlist.push(temp.getId);
  }

  for (var i = 0; i < cyclenamelist; i++) {
    cyclenamelist[i] = cyclenamelist[i].split(" ")[2];
  }

  var zeroth = "";
  if (name1 == "Consulting") {
    zeroth = cycleFolderIDlist[1];
  } else {
    zeroth = cycleFolderIDlist[0];
  }

  return zeroth;
}
