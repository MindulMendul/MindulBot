export const shuffle = (arr: Array<any>) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
<<<<<<< HEAD
};
=======
}
>>>>>>> 0ec61286 (노래봇 버그 고침 (최초))
