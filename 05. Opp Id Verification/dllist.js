function myFunction() {
  var targetFolderID = "12Z-CbJ4olWXW0RmSc0Q2A4D9kcdC5sUZ";

  var pp = DriveApp.getFolderById(targetFolderID).getFiles();
  var driveFileList = [];
  var nameList = [];
  var tt;
  while (pp.hasNext()) {
    tt = pp.next();
    // var tempCycle = random.next();
    driveFileList.push([tt, tt.getUrl()]);
    // nameList.push(pp.next())
    // driveFileList.push(pp.next().getUrl())
  }

  // var pp = DriveApp.getFolderById(targetFolderID).getFiles();
  // while (pp.hasNext()) {
  //   // var tempCycle = random.next();
  //   // driveFileList.push([pp.next(), pp.next().getUrl()]);
  //   // nameList.push(pp.next())
  //   driveFileList.push(pp.next().getUrl())
  // }

  // var finalArray = []
  // for(var i=0; i<nameList.length; i++){
  //   finalArray.push([nameList[i], driveFileList[i]])
  // }

  Logger.log(driveFileList);
}
