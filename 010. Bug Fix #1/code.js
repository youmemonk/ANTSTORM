//! ------------------------ ENABLE DRIVE API BEFORE EXECUTING -------------------------



//! ------------------------ DATA CODE -------------------------
function doGet(request) {
    return HtmlService.createTemplateFromFile("index").evaluate();
  }
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
  
  //! Global Links for Master Sheets
  var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";
  var mappingSheetID = "1Q8gnjmhrr-Awn12zXdREcemn8kOMTFdw9RPJbXtQQUg";
  var logsSheet = "1HlasqxpVjIhnzcydDuJXxEG9iOvFWI72wlKwnhC9U_g";
  var errorLogsSheet = "1H3QU_EGYwm7e3PA4DHT2v6iBrURoRvNPbXZ2bgKWWzM";
  
  //! Fetching error logs sheet
  var sheetName = "Error Logs";
  var book = SpreadsheetApp.openById(errorLogsSheet);
  var errorSheet = book.getSheetByName(sheetName);
  
  //! Fetch data from rootMasterSheet and BU name, product name, region name frommapping sheet
  function rootFolderMapping() {
    try {
      //! For Root Folder Mapping with excluding empty values
      var sheetName = "Sheet1";
      var book = SpreadsheetApp.openById(rootSheetID);
      var sheet = book.getSheetByName(sheetName);
      var masterSheetData = sheet.getDataRange().getValues();
      var cleanedMasterSheetData = [];
      for (var i = 0; i < masterSheetData.length; i++) {
        if (masterSheetData[i][1]) {
          cleanedMasterSheetData.push(masterSheetData[i]);
        }
      }
      var rootdata = arrayToJSONObject(cleanedMasterSheetData);
  
      //! For BU Name Mapping
      var busheetName = "Shared Drive Mapping";
      var bubook = SpreadsheetApp.openById(mappingSheetID);
      var buSheet = bubook.getSheetByName(busheetName);
      var buData = arrayToJSONObject(buSheet.getDataRange().getValues());
  
      //! For Product Mapping
      var productname = "Product Mapping";
      var productSheet = bubook.getSheetByName(productname);
      var productData = arrayToJSONObject(
        productSheet.getDataRange().getValues()
      );
  
      //! For Region Mapping
      var regionname = "Region List";
      var regionSheet = bubook.getSheetByName(regionname);
      var regionData = arrayToJSONObject(regionSheet.getDataRange().getValues());
  
      //! For Document logo Mapping
      var logoSheetName = "Logo Mapping";
      var logoSheet = bubook.getSheetByName(logoSheetName);
      var logoData = arrayToJSONObject(logoSheet.getDataRange().getValues());
  
      //! For PlaceHolders Mapping
      var textSheetName = "PlaceHolders";
      var textSheet = bubook.getSheetByName(textSheetName);
      var textData = arrayToJSONObject(textSheet.getDataRange().getValues());
  
      //! For fetching repo apo logs(Verification of opp id)
      var sheetName = "Repo API Logs";
      var book = SpreadsheetApp.openById(logsSheet);
      var sheet = book.getSheetByName(sheetName);
      var repoLogsData = arrayToJSONObject(sheet.getDataRange().getValues());
      // Logger.log(repoLogsData);
  
      // Logger.log(logoData);
  
      return [
        rootdata,
        buData,
        productData,
        regionData,
        logoData,
        repoLogsData,
        textData,
      ];
    } catch (e) {
      errorSheet.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        JSON.stringify(e),
      ]);
      return e;
    }
  }
  
  function arrayToJSONObject(fileList) {
    //header
    var keys = fileList[0];
  
    //* vacate keys from main array
    var newArr = fileList.slice(1, fileList.length);
  
    var formatted = [],
      data = newArr,
      cols = keys,
      l = cols.length;
    for (var i = 0; i < data.length; i++) {
      var d = data[i],
        o = {};
      for (var j = 0; j < l; j++) o[cols[j]] = d[j];
      formatted.push(o);
    }
    return formatted;
  }
  
  function fetchData(id) {
    try {
      var sheetId = id;
      var book = SpreadsheetApp.openById(sheetId);
  
      //! Get Sheet Name
      var list = [];
      for (var i = 0; i < book.getSheets().length; i++) {
        list.push(book.getSheets()[i].getName());
      }
      //! Sheetname with .include('Assets Master')
      var sheetName;
      for (var i = 0; i < list.length; i++) {
        if (list[i].includes("Assets Master")) {
          sheetName = list[i];
          break;
        }
      }
  
      var sheet = book.getSheetByName(sheetName);
      var values = sheet.getDataRange().getValues();
  
      //! Get Urls
      var urlList = ["Document Link"];
      for (var i = 1; i < values.length; i++) {
        var url = sheet
          .getRange(`B${i + 1}`)
          .getRichTextValue()
          .getLinkUrl();
        urlList.push(url);
      }
  
      var fileList = [];
      //! Merge urls and Sheet Data into Filelist
      for (var i = 0; i < values.length; i++) {
        fileList.push(values[i].concat(urlList[i]));
      }
  
      //! Filelist to JSON object
      // var startTime = (new Date()).getTime()
      var data = arrayToJSONObject(fileList);
      Logger.log(data);
      // var endTime = (new Date()).getTime()
      // Logger.log(`Call to Arraywala took ${endTime - startTime} milliseconds`)
  
      //! Data has sheet data + url links
      return data;
    } catch (e) {
      errorSheet.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        JSON.stringify(e),
      ]);
      return e;
    }
  }
  
  //! ------------------------ CREATE TEMPLATE CODE -------------------------
  
  //Create template
  var idList = [];
  
  //! Prerequisites for checking if file exists
  var flag = false;
  var index = 0;
  
  function createTemplate(bt) {
    // try {
    for (var i = 0; i < bt[1].length; i++) {
      idList.push(bt[1][i]);
    }
    var targetFolderID = bt[0]["Folder ID"];
  
    //! --------------------------------------    For verifying drive permission of user
    var currUser = Session.getActiveUser().getEmail();
    const args = {
      supportsAllDrives: true,
    };
  
    // Use advanced service to get the permissions list for the shared drive
    let pList = Drive.Permissions.list(targetFolderID, args);
  
    //Put email and role in an array
    let editors = pList.items;
    // var arr = [];
  
    // var currUser = 'mayank.ukey@searce.com'
    // var currUser = 'bjkbkjbj'
    var permissionFlag = false;
  
    for (var i = 0; i < editors.length; i++) {
      let email = editors[i].emailAddress;
      let role = editors[i].role;
      // let permissions = editors[i].permissionDetails;
  
      if (email == currUser) {
        if (role == "organizer") {
          permissionFlag = true;
          break;
        } else if (role == "writer") {
          permissionFlag = true;
          break;
        } else if (role == "fileOrganizer") {
          permissionFlag = true;
          break;
        }
        break;
      }
  
      // arr.push([email, role]);
    }
    var newTemplateUrls = [];
    var templateFlagAray = [];
    if (permissionFlag) {
      // Copy banani chahiye
      // Logger.log('You have access')
      //! --------------------------------------    For verifying Opp id/Project code
      var docUrl = [];
      var fullname = "";
      var docName = "";
      var domainName = bt[0]["Domain Name"].split(".")[0];
      // domainName.split('.')
  
      var driveStorageItems = [];
  
      //! Get the Data from the Drive
      var pp = DriveApp.getFolderById(targetFolderID).getFiles();
      var driveFileList = [];
      var tt;
      while (pp.hasNext()) {
        tt = pp.next();
        driveFileList.push([tt.getName(), tt.getUrl()]);
      }
  
      for (var i = 0; i < idList.length; i++) {
        // Reset Parameters
        // index = 0;
        // flag = false;
        try {
          fullname = "";
          docName = ""; //* clear DocName
          docName = idList[i]["Document Name & Link"];
          //! Incase document link is empty
          if(!idList[i]["Document Link"]){ 
          docUrl.push('');
          }
          else{
          docUrl.push(idList[i]["Document Link"].match(/[-\w]{25,}/));
          }
          name =
            domainName.toUpperCase() +
            " | " +
            idList[i]["Product"] +
            " | " +
            docName;
  
          //! Reset Parameters
          flag = false;
          index = 0;
          for (var j = 0; j < driveFileList.length; j++) {
            if (name == driveFileList[j][0]) {
              flag = true;
              index = j;
              break;
            }
            // no else
          }
  
          //Create File w/ if/else
          if (flag == true) {
            newTemplateUrls.push([driveFileList[index][1], true]);
          } else {
            // try {
            newTemplateUrls.push([
              DriveApp.getFileById(docUrl[i])
                .makeCopy(name, DriveApp.getFolderById(targetFolderID))
                .getUrl(),
              true,
            ]);
            // templateFlagAray.push(true)
            // } catch (e) {
            // 	errorSheet.appendRow([
            // 		new Date(),
            // 		Session.getActiveUser().getEmail(),
            // 		JSON.stringify(e),
            // 	]);
            // }
          }
        } catch (e) {
          // templateFlagAray.push(false)
          newTemplateUrls.push(["", false]);
          errorSheet.appendRow([
            new Date(),
            Session.getActiveUser().getEmail(),
            JSON.stringify(e),
            `Error with file id: ${docUrl[i]}`,
          ]);
        }
      }
      // Logger.log(idList);
      return newTemplateUrls;
    } else {
      // Access denied wala modal
      // Logger.log('You don\'t have access')
      return newTemplateUrls;
    }
    // } catch (e) {
    // 	errorSheet.appendRow([
    // 		new Date(),
    // 		Session.getActiveUser().getEmail(),
    // 		JSON.stringify(e),
    // 	]);
    // 	return e;
    // }
  }
  