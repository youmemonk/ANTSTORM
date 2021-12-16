/**=======================================================================================================================
 **                                           ---  ASSETS & TEMPLATES LIBRARY ---
//! Instuctions Before Using :
//! 1. Enable Advanced Drive Services from Google App Scripts before Deploying.

//* Copyright© Searce Inc - All Rights Reserved : Proprietary & Confidential
//* Written by Mayank Ukey <mayank.ukey@searce.com> & Ojas Mahajan <ojas.mahajan@searce.com>, December 2021
 *=======================================================================================================================**/

/**=======================================================================================================================
 *!                                                   DATA FETCH CODE
 *=======================================================================================================================**/

//! Call to Client Side
function doGet(request) {
    return HtmlService.createTemplateFromFile("index")
      .evaluate()
      .setTitle("Assets & Templates Library");
  }
  
  //! Includes JavaScript and Style Sheet to Index
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
  
  //! Global Links for RootMasterSheet, MappingSheet, OP ID Sheet, & ErrorLogSheet
  var rootSheetID = "1DeJwac2x9nToJDZq9G1fwa0DNIzZGIj5oe1Wrz3Rd68";
  var mappingSheetID = "1Q8gnjmhrr-Awn12zXdREcemn8kOMTFdw9RPJbXtQQUg";
  // var logsSheet = "1HlasqxpVjIhnzcydDuJXxEG9iOvFWI72wlKwnhC9U_g";  //Sample Repo API sheet
  var logsSheet = "1k7Qmi-vqNzUpk0ukO6R3I2HC4xXiSjLv5nkPpLpTbRM"; //Original Repo API sheet
  // var logsSheet = '16DA19UwwwjEFzheuxCgaOOkdKSIF_8skHinOgaN-EWk'; //Copy of Original Repo API sheet
  var errorLogsSheet = "1H3QU_EGYwm7e3PA4DHT2v6iBrURoRvNPbXZ2bgKWWzM";
  
  //! Fetching error logs sheet
  var sheetName = "Error Logs";
  var book = SpreadsheetApp.openById(errorLogsSheet);
  var errorSheet = book.getSheetByName(sheetName);
  
  //! Fetch data from rootMasterSheet and BU Names, Product Names, Region Names from  Respective Mapping Sheets
  function rootFolderMapping() {
    //? [IMPORTANT] Change the Sheet Names Eventually
    try {
      //! For Root Folder Mapping, excluding empty values
      var sheetName = "Sheet1"; //! CHANGE
      var masterSheetData = fetchSheet(rootSheetID, sheetName);
      var cleanedMasterSheetData = [];
  
      //* Excludes Empty Values
      for (var i = 0; i < masterSheetData.length; i++) {
        if (masterSheetData[i][1]) {
          cleanedMasterSheetData.push(masterSheetData[i]);
        }
      }
      //! Convert to JSON
      var rootdata = arrayToJSONObject(cleanedMasterSheetData);
  
      //! For BU Name Mapping
      var busheetName = "Shared Drive Mapping"; //! CHANGE
      var bubook = SpreadsheetApp.openById(mappingSheetID);
      var buData = arrayToJSONObject(fetchSheet(mappingSheetID, busheetName));
  
      // //! For Product Mapping
      var productData = [];
  
      //! For Region Mapping
      var regionname = "Region List"; //! CHANGE
      var regionData = arrayToJSONObject(fetchSheet(mappingSheetID, regionname));
  
      //! For Oppurtunity ID / Project Code Mapping
      var logsSheetName = "Repo API Logs";
      var repoLogsData = arrayToJSONObject(fetchSheet(logsSheet, logsSheetName));
      //! Store folder ID, Opportunity ID and Domain Name to new array excluding other unrelated data
      var newRepoLogsData = [];
      for (var i = 0; i < repoLogsData.length; i++) {
        newRepoLogsData[i] = {
          "Folder ID": repoLogsData[i]["Folder ID"],
          "Opportunity ID": repoLogsData[i]["Opportunity ID"],
          "Domain Name": repoLogsData[i]["Domain Name"],
        };
      }
  
      //! For Document logo Mapping
      var logoSheetName = "Logo Mapping"; //! CHANGE
      var logoData = arrayToJSONObject(fetchSheet(mappingSheetID, logoSheetName));
  
      //! For PlaceHolders Mapping
      var textSheetName = "PlaceHolders";
      var textData = arrayToJSONObject(fetchSheet(mappingSheetID, textSheetName));
  
      return [
        rootdata,
        buData,
        productData,
        regionData,
        logoData,
        newRepoLogsData,
        textData,
      ];
    } catch (e) {
      //! Entry to Error Logs with Date&Time, Email & Error Message
      errorSheet.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        JSON.stringify(e),
        "Error in fetching master and mapping data",
      ]);
      return e;
    }
  }
  
  //! Server Side Function to get Data from MasterSheet to get Templates
  //* Call From Client Side, id -> Google Document ID
  function fetchData(id) {
    try {
      var sheetId = id;
      var book = SpreadsheetApp.openById(sheetId);
  
      //! Get Sheet Name List
      var list = [];
      for (var i = 0; i < book.getSheets().length; i++) {
        list.push(book.getSheets()[i].getName());
      }
      //! Sheetname with .include('Assets Master') -> Case Insensitive
      var sheetName;
      for (var i = 0; i < list.length; i++) {
        if (list[i].toLowerCase().includes("assets master")) {
          sheetName = list[i];
          break;
        }
      }
  
      //! Data from MasterSheet -> Stored in values
      var sheet = book.getSheetByName(sheetName);
      var values = sheet.getDataRange().getValues();
  
      //! Seperate Array For Document Link from HyperLink
      var urlList = ["Document Link"];
      for (var i = 1; i < values.length; i++) {
        var url = sheet
          .getRange(`B${i + 1}`)
          .getRichTextValue()
          .getLinkUrl();
        urlList.push(url);
      }
  
      //! Merge urls and Sheet Data into Filelist
      var fileList = [];
      for (var i = 0; i < values.length; i++) {
        fileList.push(values[i].concat(urlList[i]));
      }
  
      //! Filelist to JSON object
      //* Data has sheet data + url links
      var data = arrayToJSONObject(fileList);
      // Logger.log(data);
  
      return data;
    } catch (e) {
      //! Entry to Error Logs with Date&Time, Email & Error Message
      errorSheet.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        JSON.stringify(e),
        `Error in fetching assets master data from sheet: ${sheetId}`,
      ]);
      return e;
    }
  }
  
  /**=======================================================================================================================
   *!                                                   CREATE TEMPLATE CODE
   *=======================================================================================================================**/
  
  //! All Global Variable Declarations
  var idList = [];
  //* Prerequisites for checking if file exists
  var flag = false;
  var index = 0;
  
  //! creates Template with Parameter from Client Side
  function createTemplate(templatePara) {
    try {
      //! Returns back to JavaScript
      var newTemplateUrls = [];
  
      for (var i = 0; i < templatePara[1].length; i++) {
        idList.push(templatePara[1][i]);
      }
      //! Target Folder for file creation -> from Client End
      var targetFolderID = templatePara[0]["Folder ID"];
  
      /**================================================================================================
       **                                        VERIFYING DRIVE PERMISSION OF USER
       *================================================================================================**/
  
      //! Getting Current User & their Role in Shared Drive
      var currUser = Session.getActiveUser().getEmail();
      const args = {
        supportsAllDrives: true,
      };
  
      //!  Use advanced service to get the permissions list for the Shared Drive.
      let pList = Drive.Permissions.list(targetFolderID, args);
  
      //* Put email and role in an array
      let editors = pList.items;
      var permissionFlag = false;
  
      //! Loop through to get User, and then match the Role
      //* Subsequently change the permissionFlag
      for (var i = 0; i < editors.length; i++) {
        let email = editors[i].emailAddress;
        let role = editors[i].role;
  
        if (email == currUser) {
          if (role == "writer") {
            //? Contributor
            permissionFlag = true;
            break;
          } else if (role == "fileOrganizer") {
            //? Content Manager
            permissionFlag = true;
            break;
          } else if (role == "organizer") {
            //? Manager
            permissionFlag = true;
            break;
          }
          break;
        }
      }
    } catch (e) {
      errorSheet.appendRow([
        new Date(),
        Session.getActiveUser().getEmail(),
        JSON.stringify(e),
        `Error while accessing user permission to drive folder`,
      ]);
    }
  
    if (permissionFlag) {
      /**========================================================================
       **                         For Verifying Oppurtunity ID / Project Code
       *========================================================================**/
  
      //! Local Variable Declarations
      var docUrl = [];
      var docName = "";
      var driveFileList = [];
      var file;
  
      //! Get the Data from the Drive
      var files = DriveApp.getFolderById(targetFolderID).getFiles();
  
      //! Looping through to get File Names & URls
      while (files.hasNext()) {
        file = files.next();
        driveFileList.push([file.getName(), file.getUrl()]);
      }
  
      //! Get Domain Name from Web Link, split by . and picks 0th index
      var reg = /(\w{2,}\.\w{2,3}\.\w{2,3}|\w[A-Za-z0-9-_]{2,}\.\w{2,3})$/;
      var domainName = templatePara[0]["Domain Name"].match(reg)[0];
  
      for (var i = 0; i < idList.length; i++) {
        try {
          //* Clear & Reassign Document Name
          docName = idList[i]["Document Name & Link"];
  
          //! Incase Document Link is empty
          if (!idList[i]["Document Link"]) {
            docUrl.push("");
          } else {
            docUrl.push(idList[i]["Document Link"].match(/[-\w]{25,}/));
          }
  
          //! Strictly by Naming convention
          Name =
            domainName.toLowerCase() +
            " | " +
            idList[i]["Product"] +
            " | " +
            docName;
  
          //! Reset Parameters
          flag = false;
          index = 0;
  
          //! Flags Already existing FILES BY NAME
          for (var j = 0; j < driveFileList.length; j++) {
            if (Name == driveFileList[j][0]) {
              flag = true;
              index = j;
              break;
            }
          }
  
          //! No Exisitng Files -> Create New Ones
          if (flag == true) {
            newTemplateUrls.push([driveFileList[index][1], true]);
          } else {
            //! Make A Copy
            newTemplateUrls.push([
              DriveApp.getFileById(docUrl[i])
                .makeCopy(Name, DriveApp.getFolderById(targetFolderID))
                .getUrl(),
              true,
            ]);
          }
        } catch (e) {
          newTemplateUrls.push(["", false]);
          errorSheet.appendRow([
            new Date(),
            Session.getActiveUser().getEmail(),
            JSON.stringify(e),
            `Error while creating template from file id: ${docUrl[i]}`,
          ]);
        }
      }
      return newTemplateUrls;
    } else {
      //! Trigger Access Denied Modal
      //* Returns Empty NewTemplateUrls
      return newTemplateUrls;
    }
  }
  
  //! Reusable Component: Fetch sheet data values
  function fetchSheet(paramSheetId, paramSheetName) {
    var book = SpreadsheetApp.openById(paramSheetId);
    var sheet = book.getSheetByName(paramSheetName);
    var data = sheet.getDataRange().getValues();
    return data;
  }
  
  //! Reusable Component: Convert Array to JSON
  function arrayToJSONObject(fileList) {
    //* header
    var keys = fileList[0];
  
    //* vacate keys from Main Array
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
  
  //! Use InCase, to calculate Execution Time for a Function Call
  // var startTime = (new Date()).getTime()
  // var endTime = (new Date()).getTime()
  // Logger.log(`Call to Function took ${endTime - startTime} milliseconds`)
  