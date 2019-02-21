var app = require('electron').remote;
var dialog = app.dialog;

var check = localStorage.getItem("check");
if(check == "0"){
  app.getCurrentWindow().close();
}
var version = localStorage.getItem("version");
if(version == null){
  version = "1.2.1";
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
      if(version==request.responseText){
        app.getCurrentWindow().close();
      }
      document.getElementById("title").innerHTML = "Updating Application...";
      var data1 = new FormData();
      data1.append('action', 'update');
      var request1 = new XMLHttpRequest();
      request1.open("GET","http://ladon.xyz/vma/version?action=update");
      request1.addEventListener('load', function(event) {
        if (request.status >= 200 && request.status < 300) {
          var updateData = request1.responseText.split("#@#");
          const fs = require('fs');

          //Update runCode.js
          fs.writeFile('js/runCode.js', updateData[0], (err) => {
              // throws an error, you could also catch it here
              if (err) throw err;

              //Update runCodei8.js
              fs.writeFile('js/runCodei8.js', updateData[1], (err) => {
                  // throws an error, you could also catch it here
                  if (err) throw err;

                  //Update runCoden16.js
                  fs.writeFile('js/runCoden16.js', updateData[2], (err) => {
                      // throws an error, you could also catch it here
                      if (err) throw err;

                      //Update runCodei16.js
                      fs.writeFile('js/runCodei16.js', updateData[3], (err) => {
                          // throws an error, you could also catch it here
                          if (err) throw err;

                          //Update index.html
                          fs.writeFile('index.html', updateData[4], (err) => {
                              // throws an error, you could also catch it here
                              if (err) throw err;

                              //Update integer8.html
                              fs.writeFile('integer8.html', updateData[5], (err) => {
                                  // throws an error, you could also catch it here
                                  if (err) throw err;

                                  //Update natural16.html
                                  fs.writeFile('natural16.html', updateData[6], (err) => {
                                      // throws an error, you could also catch it here
                                      if (err) throw err;

                                      //Update integer16.html
                                      fs.writeFile('integer16.html', updateData[7], (err) => {
                                          // throws an error, you could also catch it here
                                          if (err) throw err;

                                          // Update checkVersion.js
                                          fs.writeFile('js/checkVersion.js', updateData[8], (err) => {
                                              // throws an error, you could also catch it here
                                              if (err) throw err;

                                              // success case, all files were saved
                                              localStorage.setItem("version", request.responseText);
                                              app.getCurrentWindow().close();
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
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
