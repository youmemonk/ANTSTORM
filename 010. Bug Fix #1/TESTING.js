var flag = false
var index = 0

function myFunction() {
  // try {
  // for (var i = 0; i < bt[1].length; i++) {
  //   idList.push(bt[1][i]);
  // }
  //! Hardcoded
  // var idList = [{"Document Description":"This survey is conducted during CORE IT phase to understand the current tools usage. Alternatively you can also run this survey during Presales POC","Repository Default":"Manual","Sr No":1,"Region":"ALL","Document Link":"https://docs.google.com/forms/d/1BTZQT9xlqPUGfmDmvx1dzyOz5baG0ZjyUwcnWyXVPgg/edit","Product":"Google Workspace","Document Name & Link":"Current tools usage survey"},{"Document Description":"Sample Template with content for Root Cause Analysis","Repository Default":"Manual","Sr No":5,"Region":"ALL","Document Link":"https://docs.google.com/document/d/19kIlckNpxZmz2q6od2cfOPAJBBKa7pV4Pd3fiFw_5mU","Product":"Google Workspace","Document Name & Link":"Sample RCA Template"}];

  var idList = [{"Document Description":"Plan for project delivery","Repository Default":"Auto create","Sr No":3,"Document Link":"https://docs.google.com/spreadsheets/d/1fCpnRmy5HW77PQX322Q2qrEJkjseemEcGW5H72z7DXg/edit?usp=sharing","Product":"GCP","Region":"All","Document Name & Link":"Project Plan"},{"Document Description":"Document to maintain minutes for internal and external meetingas","Region":"All","Product":"GCP","Repository Default":"Auto create","Document Name & Link":"Meeting Minutes","Sr No":2},{"Document Description":"Additional requirement or modifications to exisiting deliverable request document","Repository Default":"Manual","Sr No":15,"Product":"GCP","Region":"All","Document Link":"https://docs.google.com/document/d/1Ch7x2ukV--91rj6j4fZ3N7phWwTS7qCJZhwt0NHG4iA/edit?usp=sharing","Document Name & Link":"Change Request Document"}]

  // var idList = [{"Document Description":"Plan for project delivery","Repository Default":"Auto create","Sr No":3,"Document Link":"https://docs.google.com/spreadsheets/d/1fCpnRmy5HW77PQX322Q2qrEJkjseemEcGW5H72z7DXg/edit?usp=sharing","Product":"GCP","Region":"All","Document Name & Link":"Project Plan"}];


  var targetFolderID = "1HSSnvcIEgRK34FHHPfQCYsfdAuK-2dvA";

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
    // var domainName = bt[0]["Domain Name"].split(".")[0];
    var domainName = 'Bizzy'
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

    Logger.log('step 1')

    for (var i = 0; i < idList.length; i++) {
      // Reset Parameters
      // index = 0;
      // flag = false;
    Logger.log('step 2')

      try {
        Logger.log('Inside step')
        fullname = "";
        docName = ""; //* clear DocName
        // docName = idList[i]["Document Name & Link"];
        docName = idList[i]["Document Name & Link"];
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
        Logger.log('step 3')
        flag = false;
        index = 0;
        for (var j = 0; j < driveFileList.length; j++) {
    // Logger.log('step 3')
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
          Logger.log('Flag = true')
          Logger.log(newTemplateUrls)
        } else {
          Logger.log('Flag = false')
          Logger.log(name)
          // try {
          newTemplateUrls.push([
            DriveApp.getFileById(docUrl[i])
              .makeCopy(name, DriveApp.getFolderById(targetFolderID))
              .getUrl(),
            true,
          ]
          )
          
          Logger.log(newTemplateUrls)
          ;
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
          Logger.log('Inside Catch')
          Logger.log(newTemplateUrls)
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
