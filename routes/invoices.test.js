/** Tests for invoices. */

const supertest = require("supertest");

const app = require("../app");
const { populateData } = require("../_test-common");
const db = require("../db");

// before each test, clean out data
beforeEach(populateData);

afterAll(async () => {
  await db.end();
});

describe("GET /invoices", () => {
  test("Responds with an array of invoices", async () => {
    const response = await supertest(app).get("/invoices");
    expect(response.body).toEqual({
      "invoices": [
        { id: 1, comp_code: "apple" },
        { id: 2, comp_code: "apple" },
        { id: 3, comp_code: "ibm" },
      ],
    });
  });
});

describe("GET /invoices/1", () => {
  test("Returns specific invoice information", async () => {
    const response = await supertest(app).get("/invoices/1");
    expect(response.body).toEqual({
      "invoice": {
        id: 1,
        amt: 100,
        add_date: '2018-01-01T08:00:00.000Z',
        paid: false,
        paid_date: null,
        company: {
          code: 'apple',
          name: 'Apple',
          description: 'Maker of OSX.',
        },
      },
    });
  });

  test("Returns 404 for non-existent invoice", async () => {
    const response = await supertest(app).get("/invoices/999");
    expect(response.status).toBe(404);
  });
});

describe("POST /invoices", () => {
  test("Adds a new invoice", async () => {
    const response = await supertest(app)
      .post("/invoices")
      .send({ amt: 400, comp_code: "ibm" });

    expect(response.body).toEqual({
      "invoice": {
        id: 4,
        comp_code: "ibm",
        amt: 400,
        add_date: expect.any(String),
        paid: false,
        paid_date: null,
      },
    });
  });
});

describe("PUT /invoices/1", () => {
  test("Updates an existing invoice", async () => {
    const response = await supertest(app)
      .put("/invoices/1")
      .send({ amt: 1000, paid: false });

    expect(response.body).toEqual({
      "invoice": {
        id: 1,
        comp_code: "apple",
        paid: false,
        amt: 1000,
        add_date: expect.any(String),
        paid_date: null,
      },
    });
  });

  test("Returns 404 for non-existent invoice", async () => {
    const response = await supertest(app)
      .put("/invoices/9999")
      .send({ amt: 1000 });

    expect(response.status).toBe(404);
  });

  test("Returns 500 if data is missing", async () => {
    const response = await supertest(app)
      .put("/invoices/1")
      .send({});

    expect(response.status).toBe(500);
  });
});

describe("DELETE /invoices/1", () => {
  test("Deletes an existing invoice", async () => {
    const response = await supertest(app).delete("/invoices/1");
    expect(response.body).toEqual({ status: "deleted" });
  });

  test("Returns 404 for non-existent invoice", async () => {
    const response = await supertest(app).delete("/invoices/999");
    expect(response.status).toBe(404);
  });
});

