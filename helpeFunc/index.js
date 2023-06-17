const original = [1, 2, 3, 11, 23, 94, 34, 84, 100, 112, 423, 938, 221];
// => 0 - 3 => 1 2 3
// => 0 - 7 => 1 2 3 "enter" 11 23 94
// => 0 - 15 =>

// 5, 6, 7, 17, 9, 21
const adResult = (arr, addContent) => {
  let newarr = [];
  let index = 3;
  let start = 0;
  let counter = 1;
  for (var i = 0; i < arr.length; i++) {
    // console.log((arr.indexOf(arr[i]) + 1) % 4 == 0, "index");
    if ((arr.indexOf(arr[i]) + 1) % 4 == 0) {
      //  first encounter
      console.log(index, "index value");
      newarr = [
        ...newarr.slice(0, index),
        addContent,
        ...original.slice(index),
      ];
      index = index * 2 + 2;
    } else {
      newarr.push(arr[i]);
    }
  }
  return JSON.stringify(newarr);
};

console.log(adResult(original, "enter"));
