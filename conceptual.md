### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?

PostgreSQL is an open-source object-relational database management system (ORDBMS) that is known for its robustness, reliability, and extensive feature set. 

- What is the difference between SQL and PostgreSQL?

SQL (Structured Query Language) is a standardized programming language used for managing relational databases. On the other hand, PostgreSQL is an open-source relational database management system (RDBMS) that implements the SQL language. PostgreSQL supports Python, PHP, Perl, Tcl, Net, C, C++, Delphi, Java, JavaScript (Node.js), and more. SQL Server is more limited, offering support for Java, JavaScript (Node.js), C#, C++, PHP, Python, and Ruby.

- In `psql`, how do you connect to a database?

To connect to a specific database using **psql**, you can follow these steps:

Open your command prompt or terminal window.

Type **psql** followed by the connection parameters and database name in the following format:


    psql -h <hostname> -p <port> -U <username> -d <database_name>
Replace `<hostname>` with the host where your database is running (e.g., localhost or a remote server), `<port>` with the port number on which your database is listening (default is 5432 for PostgreSQL), `<username>` with your database username, and `<database_name>` with the name of the database you want to connect to.

Press Enter to execute the command.

If the connection is successful, you will be prompted for the password associated with the provided username. Enter the password and press Enter. Note that the password will not be displayed on the screen for security reasons.

Once connected, you will see the **psql** command prompt, indicating that you are now connected to the specified database.

- What is the difference between `HAVING` and `WHERE`?

WHERE clause: The WHERE clause is used in a SELECT, UPDATE, or DELETE statement to filter rows based on specific conditions. It is applied before grouping and aggregation operations. The WHERE clause filters individual rows of a table based on column values, and only the rows that satisfy the WHERE condition are included in the result set or affected by the operation. WHERE is used with individual rows and filters data before grouping and aggregation.

HAVING clause: The HAVING clause is used in a SELECT statement with a GROUP BY clause. It is applied after grouping and aggregation operations. The HAVING clause filters the grouped data based on aggregate function results. It operates on the result of aggregations and determines which groups should be included in the result set. HAVING is used with groups of rows defined by GROUP BY and filters data after grouping and aggregation.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?

LEFT OUTER JOIN includes all rows from the left table and the matching rows from the right table. If there is no match in the right table, NULL values are included. RIGHT OUTER JOIN includes all rows from the right table and the matching rows from the left table. If there is no match in the left table, NULL values are included.

- What is an ORM? What do they do?

ORM stands for Object-Relational Mapping. It is a technique used in software development to bridge the gap between object-oriented programming (OOP) languages and relational databases. An ORM is a software layer that maps objects in an application to tables and records in a relational database. It allows developers to work with objects and their relationships directly in their code, abstracting away the need to write complex SQL queries and interact with the database directly. The ORM handles the translation of objects to database records and vice versa.

- What are some differences between making HTTP requests using AJAX and from the server side using a library like `requests`?

When making HTTP requests, there are several differences between using AJAX (Asynchronous JavaScript and XML) on the client side and making requests from the server side using a library like requests. Here are some key differences: **execution environment** (AJAX requests are made from the client-side, typically using JavaScript within a web browser, while server-side requests with libraries like requests are made from the server-side code, such as Python or another programming language.), **origin** (AJAX requests are sent from the client's browser to the server, allowing for client-side interactivity and dynamic updates. Server-side requests are made directly from the server to other APIs or web services.), **cross-domain requests** (AJAX requests are subject to the same-origin policy, which restricts requests to the same domain unless specific CORS (Cross-Origin Resource Sharing) headers are in place. Server-side requests do not face the same restrictions, as they are made directly from the server.), **security** (AJAX requests are made from client-side JavaScript and are susceptible to potential security vulnerabilities such as Cross-Site Scripting (XSS) attacks. Server-side requests made with libraries like requests are executed in a controlled server environment and are generally more secure.), **access to server resources** (AJAX requests are limited to the resources available to the client's browser, such as cookies, local storage, or client-side sessions. Server-side requests have direct access to server resources and can utilize server-side sessions, databases, and other server-level functionalities.), **performance and scalability** (AJAX requests place the burden of processing and handling requests on the client-side, which can impact the client's device and browser performance. Server-side requests offload this processing to the server, which can provide better performance and scalability, particularly when dealing with complex or resource-intensive requests.).

- What is CSRF? What is the purpose of the CSRF token?

CSRF stands for Cross-Site Request Forgery. It is a type of web security vulnerability where an attacker tricks a victim into performing unwanted actions on a web application in which the victim is authenticated.

The purpose of a CSRF token is to protect against CSRF attacks. A CSRF token is a unique and random value that is generated by the server and embedded in a form or included as a header in requests sent by the client. The token is typically associated with the user's session.

- What is the purpose of `form.hidden_tag()`?
- 
In the context of web development using frameworks like Flask or WTForms, the `form.hidden_tag()` function is used to generate HTML code for a hidden input field within a form. The purpose of the hidden input field is to store a CSRF token, which helps protect against Cross-Site Request Forgery (CSRF) attacks.