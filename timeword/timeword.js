function timeToWords(time) {
    const hours = parseInt(time.substr(0, 2));
    const minutes = parseInt(time.substr(3, 2));
    
    const hoursInWords = convertToWords(hours);
    const minutesInWords = convertToWords(minutes);
    const period = getPeriod(hours);
  
    if (minutes === 0) {
      if (hours === 0) {
        return "midnight";
      } else if (hours === 12) {
        return "noon";
      } else {
        return hoursInWords + " o'clock " + period;
      }
    } else {
      return hoursInWords + " " + minutesInWords + " " + period;
    }
  }
  
  function convertToWords(number) {
    const numbersMap = [
      "twelve", "one", "two", "three", "four", "five",
      "six", "seven", "eight", "nine", "ten", "eleven",
      "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
      "seventeen", "eighteen", "nineteen", "twenty", "twenty one",
      "twenty two", "twenty three", "twenty four", "twenty five",
      "twenty six", "twenty seven", "twenty eight", "twenty nine"
    ];
  
    if (number === 0) {
      return "twelve";
    } else if (number <= 29) {
      return numbersMap[number];
    } else if (number === 30) {
      return "thirty";
    } else {
      return "Invalid number";
    }
  }
  
  function getPeriod(hours) {
    return hours >= 12 ? "pm" : "am";
  }
  
  module.exports = timeToWords;
  