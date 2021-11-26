function createTemplate() {
  var doc_id = [
    "1sLDNsRYOwCmQCweUGOCncFy79nx8gqEfc8t5qjSto-s",
    "1k7Qmi-vqNzUpk0ukO6R3I2HC4xXiSjLv5nkPpLpTbRM",
  ];
  // var targetFolderID = "10ap5wJPZ9nsR633bV7QUk_fO_dlAeWCg";
  // var copything = [];
  // for(var i=0; i<doc_id.length; i++){

  // copything.push(DriveApp.getFileById(doc_id[i]).makeCopy(DriveApp.getFolderById(targetFolderID)).getUrl());
  // }
  // DriveApp.getFileById(doc_id).makeCopy(DriveApp.getFolderById(targetFolderID))
  Logger.log(DriveApp.getFileById(doc_id[0]).getThumbnail());

  // Logger.log(copything)
}
