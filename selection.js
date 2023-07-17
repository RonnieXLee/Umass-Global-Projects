function selectionSort(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  for (let i = 0; i < arr.length - 1; i++) {
    let lowestIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowestIndex]) {
        lowestIndex = j;
      }
    }

    if (i !== lowestIndex) {
      swap(arr, i, lowestIndex);
    }
  }

  return arr;
}

module.exports = selectionSort;
