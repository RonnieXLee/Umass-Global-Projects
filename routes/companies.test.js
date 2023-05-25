const supertest = require("supertest");

const server = require("../app");
const { generateTestData } = require("../_test-common");
const db = require("../db");

// clean data before each test
beforeEach(generateTestData);

// close database after all tests
afterAll(async () => {
  await db.end();
});

describe("GET /companies", function () {

  it("Returns array of companies", async function () {
    const response = await supertest(server).get("/companies");
    expect(response.body).toEqual({
      "companies": [
        {code: "apple", name: "Apple"},
        {code: "ibm", name: "IBM"},
      ]
    });
  });

});


describe("GET /companies/apple", function () {

  it("Returns company info", async function () {
    const response = await supertest(server).get("/companies/apple");
    expect(response.body).toEqual({
      "company": {
        code: "apple",
        name: "Apple",
        description: "Maker of OSX.",
        invoices: [1, 2],
      }
    });
  });

  it("Returns 404 for non-existent company", async function () {
    const response = await supertest(server).get("/companies/blargh");
    expect(response.status).toBe(404);
  });
});


describe("POST /companies", function () {

  it("Adds new company", async function () {
    const response = await supertest(server)
      .post("/companies")
      .send({name: "TacoTime", description: "Yum!"});

    expect(response.body).toEqual({
      "company": {
        code: "tacotime",
        name: "TacoTime",
        description: "Yum!",
      }
    });
  });

  it("Returns 500 for conflicting company", async function () {
    const response = await supertest(server)
      .post("/companies")
      .send({name: "Apple", description: "Huh?"});

    expect(response.status).toBe(500);
  });
});


describe("PUT /companies/apple", function () {

  it("Updates company information", async function () {
    const response = await supertest(server)
      .put("/companies/apple")
      .send({name: "AppleEdit", description: "NewDescrip"});

    expect(response.body).toEqual({
      "company": {
        code: "apple",
        name: "AppleEdit",
        description: "NewDescrip",
      }
    });
  });

  it("Returns 404 for non-existent company", async function () {
    const response = await supertest(server)
      .put("/companies/blargh")
      .send({name: "Blargh"});

    expect(response.status).toBe(404);
  });

  it("Returns 500 for incomplete data", async function () {
    const response = await supertest(server)
      .put("/companies/apple")
      .send({});

    expect(response.status).toBe(500);
  });
});


describe("DELETE /companies/apple", function () {

  it("Deletes specified company", async function () {
    const response = await supertest(server)
      .delete("/companies/apple");

    expect(response.body).toEqual({"status": "deleted"});
  });

  it("Returns 404 for non-existent company", async function () {
    const response = await supertest(server)
      .delete("/companies/blargh");

    expect(response.status).toBe(404);
  });
});
