const { sqlForPartialUpdate } = require("./sql");


describe("sqlForPartialUpdate", function () {
  test("works: 1 item", function () {
    const result = sqlForPartialUpdate(
      { f1: "v1" },
      { f1: "f1", fF2: "f2" }
    );
    expect(result).toEqual({
      setCols: "\"f1\"=$1",
      values: ["v1"],
    });
  });

  test("works: 2 items", function () {
    const result = sqlForPartialUpdate(
      { f1: "v1", jsF2: "v2" },
      { jsF2: "f2" }
    );
    expect(result).toEqual({
      setCols: "\"f1\"=$1, \"f2\"=$2",
      values: ["v1", "v2"],
    });
  });

  test("works: 0 items", function () {
    const result = sqlForPartialUpdate({}, {});
    expect(result).toEqual({
      setCols: "",
      values: [],
    });
  });

  test("throws error if invalid fields provided", function () {
    expect(() =>
      sqlForPartialUpdate({ f1: "v1" }, { f2: "f2" })
    ).toThrowError(
      new BadRequestError("Invalid update fields: f2")
    );
  });
});
