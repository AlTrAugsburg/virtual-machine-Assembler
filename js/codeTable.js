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

    document.getElementById("codeTable").innerHTML = document.getElementById("codeTable").innerHTML + "<tr id=\"area"+ rows +"\"><th style=\"font-size: 20px;\">"+ rows +"</th><td><input class=\"input\" type=\"text\" id=\"row"+ rows +"\"></td></tr>";

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
  var keyCode = evt.keyCode;
  var deleteKey = (keyCode == 8);

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
