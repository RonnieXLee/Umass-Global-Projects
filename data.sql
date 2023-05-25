\c biztime

DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

CREATE TABLE companies (
    company_code text PRIMARY KEY,
    company_name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    company_code text NOT NULL REFERENCES companies(company_code) ON DELETE CASCADE,
    amount float NOT NULL,
    is_paid boolean DEFAULT false NOT NULL,
    addition_date date DEFAULT CURRENT_DATE NOT NULL,
    payment_date date,
    CONSTRAINT invoices_amt_check CHECK ((amount > (0)::double precision))
);

INSERT INTO companies (company_code, company_name, description)
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (company_code, amount, is_paid, payment_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);
