const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

function calculateResult(operation, nums) {
  let result;
  switch (operation) {
    case 'mean':
      result = findMean(nums);
      break;
    case 'median':
      result = findMedian(nums);
      break;
    case 'mode':
      result = findMode(nums);
      break;
    default:
      throw new ExpressError('Invalid operation', 400);
  }
  return result;
}

app.get('/:operation', function (req, res, next) {
  const { operation } = req.params;
  const { nums } = req.query;

  if (!nums) {
    throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
  }

  const numsAsStrings = nums.split(',');
  const convertedNums = convertAndValidateNumsArray(numsAsStrings);

  if (convertedNums instanceof Error) {
    throw new ExpressError(convertedNums.message);
  }

  const result = {
    operation,
    result: calculateResult(operation, convertedNums)
  };

  return res.json(result);
});

/** general error handler */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
