### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
	- Callbacks: They are functions passed into another function as arguments and are executed later. However, they can lead to "callback hell" if used excessively or with deep nesting.
	- Promises: Introduced in ES6, Promises can handle asynchronous operations without getting into deep nesting issues.
	- Async/Await: This ES8 feature is used to simplify the syntax needed for working with Promises. It makes asynchronous code appear and behave synchronously.

- What is a Promise?
	- A Promise is an object in JavaScript that links the producing code and the consuming code together. A Promise is in one of these states: pending, fulfilled, or rejected. Promises are used for asynchronous handling, allowing the assignment of callbacks to be invoked for the success case, the failure case, or both.

- What are the differences between an async function and a regular function?
	- Regular functions are blocking and they execute synchronously, meaning they must finish executing before the next operation can begin. Async functions return a Promise and are non-blocking, they can be paused and resumed, which allows other code to run in the meantime.

- What is the difference between Node.js and Express.js?
	- Node.js is a runtime environment that executes JavaScript on the server-side whereas Express.js is a framework based on Node.js for building web applications. Express.js simplifies many of the complexities of setting up a server in raw Node.js.

- What is the error-first callback pattern?
	- In Node.js, this is a convention where the first argument to a callback function is an error object. If there is no error, the argument will be null. If there is an error, it will contain some description of the error and maybe also a stack trace. This pattern forces developers to handle errors and makes the code robust.

- What is middleware?
	- Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. They are used for a variety of purposes including logging, user authentication, serving static files, error handling, and more.

- What does the `next` function do?
	- In Express.js middleware, the next function, when invoked, passes control to the next middleware function. If not called, the request-response cycle will hang or terminate.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

	```js```

	```async function getUsers() {```

	```const elie = await $.getJSON('https://api.github.com/users/elie');```
	```const joel = await $.getJSON('https://api.github.com/users/joelburton');```
	```const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');```
	
	```return [elie, matt, joel];
	}
	```
	- The code has three asynchronous operations that are running sequentially, because of the await keyword. This means it waits for each HTTP request to complete before starting the next one, which is inefficient. These operations could be run in parallel using Promise.all().
	- Naming of variables could be improved. Variable names should be more descriptive. Here, the names elie, joel, matt are not descriptive and don't indicate what they represent.
	- There is no error handling in the code. If any of the promises reject, an error will be thrown, and since it is not caught, it will result in an unhandled promise rejection. Proper error handling should be used to catch any possible errors.
	- Hardcoding the API URLs isn't a good practice. It's generally better to store such values in variables or constants, especially if they might be reused or changed frequently.
