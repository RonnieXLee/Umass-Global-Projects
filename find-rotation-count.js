const findRotationCount = require("./find-rotation-count");

describe("#findRotationCount", function(){
  it("returns the rotation count", function(){
    expect(findRotationCount([7, 8, 9, 1, 2, 3, 4, 5, 6])).toBe(3);
    expect(findRotationCount([3, 4, 5, 6, 7, 8, 1, 2])).toBe(6);
    expect(findRotationCount([1, 2, 3, 4, 5])).toBe(0);
    expect(findRotationCount([1])).toBe(0);
    expect(findRotationCount([])).toBe(0);
  });
});