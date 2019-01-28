//Code für den Tabellenodus des Codefeldes

//Diese Variable beinhaltet die Anzahl an erstellten(!) Reihen
var rows = 1;

//Diese Variable enthält die Anzahl der sichtbaren Reihen
var rowsV = 1;

function addRow() {
  //Eine Reihe erstellen bzw. sichtbar machen

  if(document.activeElement.id != ("row"+rowsV)){
    return;
  }

  if(rows==rowsV){
    //Es gibt keine "versteckten" Reihen -> Neue Reihe erstellen

    rows = rows + 1;

    var p = document.getElementById("codeTable");
    var newElement = document.createElement("tr");
    newElement.setAttribute('id', "area"+rows);
    var html = "<th style=\"font-size: 20px;\">"+ rows +"</th><td><input class=\"input\" type=\"text\" id=\"row"+ rows +"\"></td>";
    newElement.innerHTML = html;
    p.appendChild(newElement);

    rowsV = rowsV + 1;

  }
  else {
    //Eine versteckte Reihe sichtbar machen

    rowsV = rowsV + 1;

    document.getElementById("area" + rowsV).style.display = "table-row";

  }

  document.getElementById("row"+rowsV).focus();

}

function removeRow() {
  //Eine Reihe "verstecken"

  if(document.activeElement.id != ("row"+rowsV)||document.activeElement.value!=""){
    return;
  }

  var evt = window.event;
  var deletedText = "";
  try {
    var keyCode = evt.keyCode;
    var deleteKey = (keyCode == 8);
  } catch (e) {

  }

  if (document.activeElement.length) {
    deletedText = document.activeElement.value.slice(document.activeElement.start, document.activeElement.end);
  } else {
      deletedText = document.activeElement.value.charAt(deleteKey ? document.activeElement.start : document.activeElement.start - 1);
  }

  if(deletedText != ""){
    return;
  }

  if(rowsV != 1){
    //Es sind mehr als eine Reihe da bzw. sichtbar -> eine Reihe kann versteckt werden

    document.getElementById("area" + rowsV).style.display = "none";

    rowsV = rowsV - 1;

    document.getElementById("row"+rowsV).focus();

  }

}

function saveAT() {
  if(state != "stop"){
    return;
  }
  var app = require('electron').remote;
  var dialog = app.dialog;
  var fs = require('fs');
  let content = "";

  for(var i = 0; i<rowsV; i++){

    if(i == 0){
      content = document.getElementById("row"+(i+1)).value;
    }
    else {
      content = content + "\n" + document.getElementById("row"+(i+1)).value;
    }

  }

  if(fileOpen != ""){

    fs.writeFile(fileOpen, content, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }

        alert("The file has been succesfully saved");
    });

  }

  else {

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog(null, {
      filters: [
        { name: 'Ladon Assembler Code (*.lasm)', extensions: ['lasm'] },
        { name: 'Text File (*.txt)', extensions: ['txt'] }
      ]
    }, (fileName) => {
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }

        fileOpen = fileName;

        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, content, (err) => {
            if(err){
                alert("An error ocurred creating the file "+ err.message)
            }

            alert("The file has been succesfully saved");
        });
    });

  }

}

function saveAsT() {
  if(state != "stop"){
    return;
  }
  var app = require('electron').remote;
  var dialog = app.dialog;
  var fs = require('fs');
  let content = "";

  for(var i = 0; i<rowsV; i++){

    if(i == 0){
      content = document.getElementById("row"+(i+1)).value;
    }
    else {
      content = content + "\n" + document.getElementById("row"+(i+1)).value;
    }

  }

  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog(null, {
    filters: [
      { name: 'Ladon Assembler Code (*.lasm)', extensions: ['lasm'] },
      { name: 'Text File (*.txt)', extensions: ['txt'] }
    ]
  }, (fileName) => {
      if (fileName === undefined){
          console.log("You didn't save the file");
          return;
      }

      fileOpen = fileName;

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, (err) => {
          if(err){
              alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
      });
  });

}

function openAT() {
  if(state != "stop"){
    return;
  }
  var app = require('electron').remote;
  var dialog1 = app.dialog;
  var fs = require('fs');

  dialog1.showOpenDialog(null, {
    filters: [
      { name: 'Ladon Assembler Code (*.lasm)', extensions: ['lasm'] },
      { name: 'Text File (*.txt)', extensions: ['txt'] }
    ]
    },(fileNames) => {
      // fileNames is an array that contains all the selected
      if(fileNames === undefined){
          console.log("No file selected");
          return;
      }

      var fileName = fileNames[0];

      fileOpen = fileNames[0];

      fs.readFile(fileName, 'utf-8', (err, data) => {
          if(err){
              alert("An error ocurred reading the file :" + err.message);
              return;
          }

          data = data.split(/\n/);

          while(rowsV > data.length){
            document.getElementById("row"+rowsV).value = "";
            document.getElementById("row"+rowsV).focus();
            removeRow();
          }
          while(rowsV < data.length){
            document.getElementById("row"+rowsV).focus();
            addRow();
          }

          for(var i = 0; i<rowsV; i++){

            if(i == 0){
              document.getElementById("row"+(i+1)).value = data[i];
            }
            else {
              document.getElementById("row"+(i+1)).value = data[i];
            }

          }
      });
  });
}
