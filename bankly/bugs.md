Bug #1:
Description: The User.register method in user.js does not return the hashed password in the response, which is inconsistent with the implementation.

Test that catches the case:

```
test("should return the hashed password in the response", async function() {
  const response = await request(app)
    .post("/auth/register")
    .send({
      username: "new_user",
      password: "new_password",
      first_name: "new_first",
      last_name: "new_last",
      email: "new@newuser.com",
      phone: "1233211221"
    });
  expect(response.statusCode).toBe(201);
  expect(response.body.password).toEqual(expect.any(String));
});
```

Fix for the code:
In the User.register method in user.js, modify the INSERT INTO query to include the password column in the RETURNING clause:

```
const result = await db.query(
  `INSERT INTO users 
      (username, password, first_name, last_name, email, phone) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING username, password, first_name, last_name, email, phone`,
  [
    username,
    hashedPassword,
    first_name,
    last_name,
    email,
    phone
  ]
);
```

Bug #2:
Description: The User.authenticate method in user.js does not throw an error with a status of 401 when the username/password combination is incorrect. Instead, it continues executing and returns undefined.

Test that catches the case:

```
test("should raise 401 error for incorrect username/password", async function() {
  const response = await request(app)
    .post("/auth/login")
    .send({
      username: "u1",
      password: "incorrect_password"
    });
  expect(response.statusCode).toBe(401);
  expect(response.body.message).toBe("Cannot authenticate");
});
```

Fix for the code:
In the User.authenticate method in user.js, modify the if condition to throw an ExpressError when the username/password combination is incorrect:

```
if (user && (await bcrypt.compare(password, user.password))) {
  return user;
} else {
  throw new ExpressError('Cannot authenticate', 401);
}
```

Bug #3:
Description: The User.getAll method in user.js does not return the correct basic user information. It is missing the username field in the returned data.

Test that catches the case:

```
test("should return all basic user information including the username", async function() {
  const response = await request(app)
    .get("/users")
    .send({ _token: tokens.u1 });
  expect(response.statusCode).toBe(200);
  expect(response.body.users).toEqual(expect.arrayContaining([
    expect.objectContaining({
      username: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String)
    })
  ]));
});
```

Fix for the code:
In the User.getAll method in user.js, modify the SELECT query to include the username field:

```
const result = await db.query(
  `SELECT username,
            first_name,
            last_name
     FROM users
     ORDER BY username`
);
```

Bug #4:
Description: The User.get method in user.js does not throw an error with a status of 404 when the user cannot be found. Instead, it continues executing and returns undefined.

Test that catches the case:

```
test("should raise 404 error when user cannot be found", async function() {
  const response = await request(app)
    .get("/users/not-a-user")
    .send({ _token: tokens.u1 });
  expect(response.statusCode).toBe(404);
  expect(response.body.message).toBe("No such user");
});
```

Fix for the code:
In the User.get method in user.js, add a throw statement to raise an ExpressError when the user cannot be found:

```
if (!user) {
  throw new ExpressError('No such user', 404);
}
```

Bug #5:
Description: The User.delete method in user.js does not call the delete method on the User model. It should be await User.delete(...).

Test that catches the case:

```
test("should delete the user and return 'deleted' message", async function() {
  const response = await request(app)
    .delete("/users/u1")
    .send({ _token: tokens.u3 }); // u3 is admin
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("deleted");
});
```

Fix for the code:
In the User.delete method in user.js, call the delete method on the User model with await:

```
await User.delete(req.params.username);
```

Bug #6:
Description: The authUser middleware in auth.js sets the req.curr_username and req.curr_admin variables to undefined when there is no token, instead of not modifying them. This can lead to unintended behavior in other parts of the code that rely on these variables.

Test that catches the case:

```
test("should not modify req.curr_username and req.curr_admin when there is no token", async function() {
  const response = await request(app).get("/users/u1");
  expect(response.statusCode).toBe(401);
  expect(response.body.message).toBe("Unauthorized");
});
```

Fix for the code:
In the authUser middleware in auth.js, remove the assignment of undefined to req.curr_username and req.curr_admin:

```
if (token) {
  let payload = jwt.decode(token);
  req.curr_username = payload.username;
  req.curr_admin = payload.admin;
}
```
