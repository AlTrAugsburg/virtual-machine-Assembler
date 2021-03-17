var app = require('electron').remote;
var dialog = app.dialog;
var schreibenendeDateien = 0;

var check = localStorage.getItem("check");
if(check == "0"){
  app.getCurrentWindow().close();
}
var version = localStorage.getItem("version");
if(version == null){
  version = "1.2.2";
}

if(!navigator.onLine){
  //Kein Internetzugang -> Versioncheck ot possible
  dialog.showMessageBox({
    type: "warning",
    buttons: ["Ok"],
    title: "Internet connection",
    message: "You aren't connected to the internet! Version check wasn't possible.",
    noLink: true
  }, (response) => {
    app.getCurrentWindow().close();
  });
}
else{
  var data = new FormData();
  data.append('action', 'getVersion');
  var request = new XMLHttpRequest();
  request.open("GET","http://ladon.xyz/vma/version?action=getVersion");
  request.addEventListener('load', function(event) {
    if (request.status >= 200 && request.status < 300) {
      if(request.responseText==version){
        app.getCurrentWindow().close();
      }
      document.getElementById("title").innerHTML = "Updating Application...";
      dialog.showMessageBox({
        type: "warning",
        buttons: ["Ok"],
        title: request.statusText,
        message: " wasn't possible to get update data from server. Case: "+request.responseText,
        noLink: true
      }, (response) => {
        app.getCurrentWindow().close();
      });
      var data1 = new FormData();
      data1.append('action', 'update');
      var request1 = new XMLHttpRequest();
      request1.open("GET","http://ladon.xyz/vma/version?action=update");
      request1.addEventListener('load', function(event) {
        if (request.status >= 200 && request.status < 300) {
          var updateData = request1.responseText.split("#@#");
          for (var i = 0; i < updateData.length; i++) {
            updateData[i] = updateData.split("#@splitter@#");
          }
          const fs = require('fs');

          schreibenendeDateien = 0;
          //Schleife die alle Elemente durch geht, die geupdatet werden sollen
          for(var i = 0; i < updateData.length; i++)
          {
            schreibenendeDateien++;
            //Update files(Erstes Dateiname, zweites Inhalt)
            fs.writeFile(updateData[0], updateData[1], (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;

                schreibenendeDateien--;
            });
          }
          checkIfReady();
          app.getCurrentWindow().close();
        }
        else {
          dialog.showMessageBox({
            type: "warning",
            buttons: ["Ok"],
            title: request.statusText,
            message: "It wasn't possible to get update data from server. Case: "+request.responseText,
            noLink: true
          }, (response) => {
            app.getCurrentWindow().close();
          });
        }
      });
      request1.send();
    }
    else {
      dialog.showMessageBox({
        type: "warning",
        buttons: ["Ok"],
        title: request.statusText,
        message: "It wasn't possible to connect to server. Case: "+request.responseText,
        noLink: true
      }, (response) => {
        app.getCurrentWindow().close();
      });
    }
 });
 request.send();
}

function checkIfReady()
{
  if(schreibenendeDateien == 0)
  {
    app.getCurrentWindow().close();
  }
  else
  {
    setTimeout(checkIfReady(), 500);
  }
}
