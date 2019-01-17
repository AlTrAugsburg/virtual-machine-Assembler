function runCode(){
  var codeFromArea = document.getElementById("code").value;
  var code = codeFromArea.split(/\n/);

  //Arbeitsspeicher R0, wird nach jeder Ausführung auf 0 zurückgesetzt
  var r0 = 0;

  //Schauen, ob Code zum Ausführen überhaupt vorhanden ist
  if(code.length == 1 && code[0] == ""){

    document.getElementById("log").value = "There's no code to execute.\n" + document.getElementById("log").value;

    return;

  }

  //Variable für Befehlszähler
  var bz = 0;

  //Variable um zu überprüfen, ob der Befehl END verwendet wurde
  var end = false;

  //Variable in welche der Befehl geladen wird
  var befehl;

  //&#13;&#10; == new line in textarea

  /*

    Befehle im Ladon Assembler Code (.lasm)

    LOAD x  -- Kopiert den Wert in Rx (außer R0), nach R0
    DLOAD i -- Lädt nmittelbar die Zahl i in R0
    STORE x -- Kopiert den Wert in R0 nach Rx (außer R0)
    ADD x   -- Addiert den Wert in Rx (außer R0) zum Wert in R0 und legt das Ergebnis in R0 ab
    SUB x   -- Subtrahiert den Wert in Rx (außer R0) vom Wert in R0 und legt das Ergebnis in R0 ab
    MULT x  -- Multipliziert den Wert in Rx (außer R0) mit dem Wert in R0 und legt das Ergebnis in R0 ab
    DIV x   -- Dividiert den Wert in R0 durch den Wert in Rx (außer R0) und legt das Ergebnis in R0 ab
    JUMP n  -- Unbedingeter Sprung zum n-ten Befehl, d.h. der n-te Befehl wird danach ausgeführt
    JGE n   -- Falls der Wert in R0 größer oder gleich null ist (Greater or Equal) wird zum n-ten Befehl gesprungen
    JGT n   -- Falls der Wert in R0 größer als null ist (Greater Than) wird zum n-ten Befehl gesprungen
    JLE n   -- Falls der Wert in R0 kleiner oder gleich null ist (Less or Equal) wird zum n-ten Befehl gesprungen
    JLT n   -- Falls der Wert in R0 kleiner als null ist (Less Than) wird zum n-ten Befehl gesprungen
    JEQ n   -- Falls der Wert in R0 gleich null ist (EQuals) wird zum n-ten Befehl gesprungen
    JNE n   -- Falls der Wert in R0 nicht gleich null ist (Not Equals) wird zum n-ten Befehl gesprungen
    END     -- Dieser Befehl beendet den Programmablauf

    Nach jedem Befehl wird der Wert im Befehlszähler um 1 erhöht, außer bei den Sprüngen, da wird er an den Wert angepasst,
    sollte die Bedingung erfüllt sein bzw. wenn es sich um einen bedingungslosen Sprung handelt, ansonsten wird auch dort
    Befehlszählerwert um 1 erhöht. Der Befehlszähler beginnt bei 0 und zeigt, welcher Befehl als nächstes ausgeführt werden
    soll.

    Nach dem Strichpunkt, welcher am Ende jedes Befehls steht kann noch ein Kommentar stehen

  */

  while(bz<code.length&&!end){
    console.log(bz);

    //Kommentar und Befehl trennen, sollte ein Kommentar vorhanden sein
    var b1 = code[bz].split(";");
    befehl = b1[0].split(" ");

    //Schauen ob Syntaxfehler vorhanden (d.h. mehr/weniger als Operation und Ziel, außer bei END)
    if(befehl.length!=2&&befehl[0]!="END"){

      document.getElementById("log").value = "Syntax Error in line " + (bz+1) + ". Code execution ended.\n" + document.getElementById("log").value;

      return;

    }

    //Operation auslesen
    switch (befehl[0]) {

      case "LOAD":
        //Operation lautet den Wert aus Rx in R0 zu verschieben.

        //Schauen, ob Register vorhanden ist, und wenn ja auslesen und in R0 speichern
        if(befehl[1] == "1" || befehl[1] == "2" || befehl[1] == "3" || befehl[1] == "4" || befehl[1] == "5" || befehl[1] == "6" || befehl[1] == "7" || befehl[1] == "8" || befehl[1] == "9" || befehl[1] == "10" || befehl[1] == "11" || befehl[1] == "12" || befehl[1] == "13" || befehl[1] == "14"){

          r0 = parseInt(document.getElementById("r" + befehl[1]).innerHTML, 2);

          document.getElementById("log").value = "Command " + (bz+1) + ": LOAD " + befehl[1] + ";\nR0 = " + r0 + ";\n" + document.getElementById("log").value;

        }

        //Es ist nicht vorhanden oder R0 (dieses kann nicht in R0 geladen werden, da es der selbe ist)
        else {

          document.getElementById("log").value = "Error in line " + (bz+1) + ". The register doesn't exist or is R0. Code execution ended.\n" + document.getElementById("log").value;

          return;

        }

        //Befehlszählerwert um 1 erhöhen
        bz = bz +1;

        break;

      case "DLOAD":
        //Operation lautet Wert i in R0 zu laden, wobei i nicht größer als 255 sein darf

        if(isNaN(befehl[1])){
          //Der Wert von i ist keine Zahl -> Syntaxfehler

          document.getElementById("log").value = "Syntaxerror in line " + (bz+1) + ". There is no number to load. Code execution ended.\n" + document.getElementById("log").value;

          return;

        }

        if(parseInt(befehl[1]) > 255){
          //Der Wert von i ist größer als 255 -> Stack Overflow

          document.getElementById("log").value = "Stack Overflow at line " + (bz+1) + ". Code execution ended.\n" + document.getElementById("log").value;

          return;

        }

        if(parseInt(befehl[1]) < 0){
          //Der Wert von i ist kleiner 0 -> Error

          document.getElementById("log").value = "Syntaxerror in line " + (bz+1) + ". The machine doesn't support negative numbers. Code execution ended.\n" + document.getElementById("log").value;

          return;

        }

        r0 = befehl[1];

        document.getElementById("log").value = "Command " + (bz+1) + ": DLOAD " + befehl[1] + ";\nR0 = " + r0 + ";\n" + document.getElementById("log").value;

        break;

      default:
        //Befehl exestiert nicht -> Syntaxfehler

        document.getElementById("log").value = "Syntax Error in line " + (bz+1) + ". Code execution ended.\n" + document.getElementById("log").value;

        return;

    }

    end = true;

  }

}
