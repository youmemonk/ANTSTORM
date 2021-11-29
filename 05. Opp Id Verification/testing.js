function myFunction() {
    var target = '1u_SFqbw9od2oGlJNOyJ5w2nJISE0ajQF';
    var name = 'BHARATPE'
  
    var pp = DriveApp.getFolderById(target).getFiles();
    var driveFileList = [];
    while (pp.hasNext()) {
      // var tempCycle = random.next();
      driveFileList.push([pp.next(), pp.next().getUrl()])
    }
  
    // var driveFileNames = driveFileList[0].join()
    // // var driveFileUrls = driveFileList[1].join()
    // if(driveFileNames.includes(name)){
    //   Logger.log('exist')
    // }
  
    // if(dri)
    // if(driveFileList.includes(name)){
      // Logger.log(driveFileList)
    //   Logger.log('yes')
    // }
    function work(){
      var name = 'andu'
      return name
    }
  
    Logger.log(driveFileList.map(work))
    // Logger.log(driveFileList)
  }
  