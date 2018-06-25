//JS Code Challenge. Find three question marks between two numbers that add up to 10.
//June 22, 2018
//Created by Corey Anthony

var QuestionMarks = function(str){
  var res = str.match(/\d.*?(\d)/g);
  var trueFlag = false;
    if (res === null || res[0].length < 3) {  //if there is not one or more ? between two numbers log false.
      } else {
        for (var i = 0; i < res.length; i++) {
          if (res[i].match(/\?/g).length ===3) { //check to see if exactly three ???
            //Add the first and last number in the string together.
            if (parseInt(res[i].charAt(0))+parseInt(res[i].slice(-1)) === 10) {
              trueFlag = true; //If it adds up to 10 log true
            } else {
                //If it does not add up to 10 log false
              if (!trueFlag) {trueFlag = false;}
            }
          } else {
            if (!trueFlag) {trueFlag = false;} //not three ???, log false.
          }
        }
      }
    console.log(trueFlag);
  }

//Senarios to try:
//QuestionMarks("arrb6???ee?4xxbl5???eee5");
//QuestionMarks("arrb6??s4xxbl5??g?eee5");
//QuestionMarks("arr");
//QuestionMarks("bb6?9c");
//QuestionMarks("bb69c");
//QuestionMarks("bcc?7??ccc?3tt1??????5");
