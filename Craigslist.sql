-- create tables for regions, users, posts, and categories
CREATE TABLE regions (
  region_id INT PRIMARY KEY,
  region_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50),
  preferred_region_id INT,
  FOREIGN KEY (preferred_region_id) REFERENCES regions(region_id)
);

CREATE TABLE posts (
  post_id INT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  user_id INT NOT NULL,
  location VARCHAR(50) NOT NULL,
  region_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE categories (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL
);

CREATE TABLE post_categories (
  post_id INT,
  category_id INT,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
