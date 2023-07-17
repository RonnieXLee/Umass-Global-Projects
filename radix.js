function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function getMaxDigitCount(nums) {
  let maxDigitCount = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigitCount = Math.max(maxDigitCount, digitCount(nums[i]));
  }
  return maxDigitCount;
}

function radixSort(nums) {
  const maxDigitCount = getMaxDigitCount(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const digit = getDigit(num, k);
      digitBuckets[digit].push(num);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

module.exports = { getDigit, digitCount, getMaxDigitCount, radixSort };
