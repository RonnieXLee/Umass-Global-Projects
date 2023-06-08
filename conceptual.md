### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
	- JWT stands for JSON Web Token. It is a compact, URL-safe means of representing claims between two parties. A JWT contains encoded information in the form of JSON data structures. It is commonly used for authentication and authorization purposes in web applications and APIs.

- What is the signature portion of the JWT?  What does it do?
	- The signature is one of the three components of a JSON Web Token (JWT). It is used to ensure the integrity and authenticity of the token. The signature is created by taking the encoded header, the encoded payload, and a secret key known only to the server, and applying a cryptographic algorithm to generate a hash value.

- If a JWT is intercepted, can the attacker see what's inside the payload?
	- No, the payload of a JWT is not encrypted by default, so if a JWT is intercepted, the attacker can easily decode and read the contents of the payload. The payload is Base64Url encoded, which is a form of encoding that allows the data to be represented in a URL-safe format.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
	- At a high level, the implementation of authentication with JWT involves the following steps:
		- User Registration: Users create an account and provide their credentials (e.g., username and password) to the server.
		- User Authentication: When a user attempts to log in, the server verifies the provided credentials. If the credentials are valid, the server generates a JWT and signs it with a secret key.
		- JWT Issuance: The server sends the JWT back to the client (typically in the response body or a response header). The client receives and stores the JWT securely (e.g., in local storage or a cookie).
		- Subsequent Requests: For all subsequent requests to protected routes or resources, the client includes the JWT in the request (usually in an Authorization header using the Bearer scheme).
		- JWT Verification: The server receives the request and extracts the JWT from the Authorization header. It then verifies the JWT's signature using the secret key it shares with the client. If the signature is valid, the server knows that the JWT hasn't been tampered with.
		- Access Authorization: After verifying the signature, the server extracts the user identity and other information from the JWT's payload. It can then use this information to determine if the user has the necessary permissions to access the requested resource.
		- Response: If the user is authorized, the server processes the request and sends back the desired response. If the JWT is invalid, expired, or the user doesn't have the required permissions, the server responds with an appropriate error status.
	- By implementing authentication with JWT, the server doesn't need to store user session data or query a database for every request. Instead, the server relies on the self-contained JWT to authenticate and authorize the user, reducing the need for server-side storage and enhancing scalability.

- Compare and contrast unit, integration and end-to-end tests.
	- Unit Tests:
		- Focus on testing individual units or components of code in isolation.
		- Verify the behavior and correctness of specific functions and their interactions with JWT-related logic.
		- Test cases may include payload generation, signature creation, token expiration, and token decoding.
		- Fine-grained and target specific functions.
		- Faster to execute compared to integration and end-to-end tests.
	- Integration Tests:
		- Verify the interaction between different components or modules of an application.
		- Test the integration between authentication-related components, such as user registration, login, and token handling.
		- Ensure that different parts of the system work together correctly and that the data flow, including JWT handling, is properly coordinated.
		- Test scenarios may involve user registration, successful login, token issuance, and token verification.
		- Medium-grained and focus on component interactions.
	- End-to-End Tests:
		- Simulate real-world scenarios and test the entire system or a significant portion of it.
		- Cover the complete authentication flow, from user registration to accessing protected resources using JWT.
		- Verify the entire system's behavior, including user interactions, server responses, and the correct handling of JWT throughout the authentication process.
		- Test scenarios may involve user registration, login, token issuance, storing/retrieving tokens on the client-side, token inclusion in subsequent requests, and accessing protected resources.
		- Coarse-grained and simulate real-world scenarios.
	- All three types of tests are valuable in ensuring the correct implementation and behavior of JWT-related functionality at different levels of the application. Unit tests are focused and fast, integration tests validate component interactions, and end-to-end tests cover the entire system and simulate real-world scenarios.

- What is a mock? What are some things you would mock?
	- A mock, in the context of testing, is a simulated or substitute object that mimics the behavior of a real object or component. It allows you to isolate and control the dependencies of the code being tested, ensuring a predictable and controlled environment for testing. By using mocks, you can create controlled and deterministic test environments, decoupled from external dependencies, and focus on testing specific aspects of your JWT-related code in isolation.

- What is continuous integration?
	- Continuous Integration (CI) is a software development practice that involves regularly integrating code changes from multiple developers into a shared repository. It aims to detect integration issues and conflicts early in the development process by frequently merging and testing code changes in an automated and systematic manner.

- What is an environment variable and what are they used for?
	- An environment variable is a dynamic value that is part of the environment in which a software program runs. It is a named value that can be accessed by the operating system or software applications during runtime. Environment variables are typically set outside of the code and can vary depending on the environment in which the program is executed.

- What is TDD? What are some benefits and drawbacks?
	- TDD (Test-Driven Development) is a software development approach where tests are written before the code. Benefits of TDD include improved code quality, faster feedback, regression testing, facilitated design, and documentation. Drawbacks include time-consuming nature, learning curve, test coverage challenges, and maintenance overhead. TDD requires discipline and planning but can lead to more robust software.

- What is the value of using JSONSchema for validation?
	- JSONSchema provides a standardized way to validate JSON data by defining its structure, data types, and constraints. Its value lies in ensuring data consistency, validating data correctness, serving as documentation, promoting interoperability, and supporting integration testing. Overall, JSONSchema improves data quality, facilitates system integration, and enhances data understanding and exchange.

- What are some ways to decide which code to test?
	- To decide which code to test:
		- Prioritize critical and complex code.
		- Test input validation, user interactions, and error handling.
		- Test code related to business rules and requirements.
		- Focus on recently changed or added code.
		- Consider performance-critical code.
		- Use a combination of unit, integration, and end-to-end tests.

- What does `RETURNING` do in SQL? When would you use it?
	- The RETURNING clause in SQL is used to retrieve specific column values affected by an INSERT, UPDATE, or DELETE statement. It eliminates the need for an additional query to fetch the values and allows for efficient processing and retrieval of the affected data.
	- You would use the RETURNING clause when you need to retrieve specific column values of the affected rows after performing an INSERT, UPDATE, or DELETE operation. It eliminates the need for an additional query to fetch the updated or deleted values, making your code more efficient and reducing database round trips. The retrieved values can be used for further processing, displaying to the user, or for auditing purposes.

- What are some differences between Web Sockets and HTTP?
	- Web Sockets provide persistent, bidirectional communication, while HTTP follows a request-response model.
	- HTTP is stateless, while Web Sockets enable real-time, asynchronous communication.
	- HTTP is request-driven, while Web Sockets support continuous data transfer.
	- Web Sockets have their own protocol, while HTTP uses a simple request-response protocol.
	- HTTP is widely supported, while Web Sockets require specific client and server support.
	- HTTP requests have more overhead, while Web Sockets have lower overhead once the connection is established.
	- HTTP is suitable for client-server interactions, while Web Sockets excel in real-time applications.
	- HTTP and Web Sockets can be used together based on specific application needs.

- Did you prefer using Flask over Express? Why or why not (there is no right answer here --- we want to see how you think about technology)?
	- Flask is preferable over Express because of its simplicity and flexibility, concise syntax and ease of integration with other Python tools.
