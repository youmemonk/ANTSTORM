function test() {
  var targetFolderID = "10ap5wJPZ9nsR633bV7QUk_fO_dlAeWCg";
  var getEditors = DriveApp.getFolderById(targetFolderID).getViewers();
  // Logger.log(getEditors)
  for (var i = 0; i < getEditors.length; i++) {
    // if(getEditors[i].getEmail()==Session.getActiveUser().getEmail()){
    //   Logger.log(getEditors[i].getEmail())
    // }
    Logger.log(getEditors[i].getName());
  }
}
