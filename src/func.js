const moment = require('moment');
function equalTime(h, m) {
    return (moment().hour()==h && moment().minute()==m);
}

function shuffle(arr){
  for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
  return arr;
}

module.exports = {equalTime, shuffle};