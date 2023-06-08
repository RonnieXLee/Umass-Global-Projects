const timeToWords = require('./timeword');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeToWords).toBe('function');
  });

  // Add your existing test cases here
  test('should convert 00:00 to midnight', () => {
    expect(timeToWords('00:00')).toBe('midnight');
  });

  test('should convert 00:12 to twelve twelve am', () => {
    expect(timeToWords('00:12')).toBe('twelve twelve am');
  });

  test('should convert 01:00 to one o’clock am', () => {
    expect(timeToWords('01:00')).toBe('one o’clock am');
  });

  test('should convert 06:01 to six oh one am', () => {
    expect(timeToWords('06:01')).toBe('six oh one am');
  });

  test('should convert 06:10 to six ten am', () => {
    expect(timeToWords('06:10')).toBe('six ten am');
  });

  test('should convert 06:18 to six eighteen am', () => {
    expect(timeToWords('06:18')).toBe('six eighteen am');
  });

  test('should convert 06:30 to six thirty am', () => {
    expect(timeToWords('06:30')).toBe('six thirty am');
  });

  test('should convert 10:34 to ten thirty four am', () => {
    expect(timeToWords('10:34')).toBe('ten thirty four am');
  });

  test('should convert 12:00 to noon', () => {
    expect(timeToWords('12:00')).toBe('noon');
  });

  test('should convert 12:09 to twelve oh nine pm', () => {
    expect(timeToWords('12:09')).toBe('twelve oh nine pm');
  });

  test('should convert 23:23 to eleven twenty three pm', () => {
    expect(timeToWords('23:23')).toBe('eleven twenty three pm');
  });
});
