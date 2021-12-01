function getPermissionsList() {
  // var startTime = (new Date()).getTime()
  // const fileId = "1ogdtJN8BLLukh5DCx_zZxbkCyaAwfXT4"; // Project drive
  const fileId = "1mWafSfvrOxWqPqrWYMqaNNTr6M6XTsXy"; // Project drive

  // THIS IS IMPORTANT! The default value is false, so the call won't
  // work with shared drives unless you change this via optional arguments
  const args = {
    supportsAllDrives: true,
  };

  // Use advanced service to get the permissions list for the shared drive
  let pList = Drive.Permissions.list(fileId, args);
  // Logger.log(pList.items[5].role)

  //Put email and role in an array
  let editors = pList.items;
  var arr = [];

  var currUser = Session.getActiveUser().getEmail();
  // var currUser = 'mayank.ukey@searce.com'
  // var currUser = 'bjkbkjbj'
  var bool = false;

  for (var i = 0; i < editors.length; i++) {
    let email = editors[i].emailAddress;
    let role = editors[i].role;
    // let permissions = editors[i].permissionDetails;

    if (email == currUser) {
      if (role == "organizer") {
        bool = true;
        break;
      } else if (role == "writer") {
        bool = true;
        break;
      } else if (role == "fileOrganizer") {
        bool = true;
        break;
      }
      break;
    }

    arr.push([email, role]);
  }
  if (bool) {
    // Copy banani chahiye
    Logger.log("You have access");
  } else {
    // Access denied wala modal
    Logger.log("You don't have access");
  }
  // var endTime = (new Date()).getTime()
  // Logger.log(`Call to Arraywala took ${endTime - startTime} milliseconds`)

  // Logger.log(arr);
}
// function test(){
//   var targetFolderID = '10ap5wJPZ9nsR633bV7QUk_fO_dlAeWCg'
//   var getEditors = DriveApp.getFolderById(targetFolderID).getViewers()
//   // Logger.log(getEditors)
//   for(var i=0; i<getEditors.length; i++){
//     // if(getEditors[i].getEmail()==Session.getActiveUser().getEmail()){
//     //   Logger.log(getEditors[i].getEmail())
//     // }
//     Logger.log(getEditors[i].getName())
//   }
// }
