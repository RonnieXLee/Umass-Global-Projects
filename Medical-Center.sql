-- define the schema
CREATE DATABASE IF NOT EXISTS medical_center;
USE medical_center;

CREATE TABLE doctors (
  doctor_id INT PRIMARY KEY,
  name VARCHAR(50),
  specialization VARCHAR(50)
);

CREATE TABLE patients (
  patient_id INT PRIMARY KEY,
  name VARCHAR(50),
  date_of_birth DATE,
  gender CHAR(1)
);

CREATE TABLE visits (
  visit_id INT PRIMARY KEY,
  doctor_id INT,
  patient_id INT,
  visit_date DATE,
  diagnosis VARCHAR(100),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- generate the diagram
SELECT table_name, column_name, data_type, is_nullable, column_key, extra, table_comment
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_schema = 'medical_center';
