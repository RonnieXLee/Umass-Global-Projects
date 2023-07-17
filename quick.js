function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  let pivotValue = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotValue) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }

  swap(arr, start, swapIndex);
  return swapIndex;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

module.exports = { pivot, quickSort };
