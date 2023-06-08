const API = "http://localhost:3000";

// In-memory auth info
let username = localStorage.getItem("username");
let _token = localStorage.getItem("token");

if (_token) {
  showAuth();
} else {
  document.getElementById("need-auth").style.display = "block";
}

/** Called when we get authenticated: stores auth info. */
function saveAuth(new_username, new_token) {
  username = new_username;
  _token = new_token;

  localStorage.setItem("username", username);
  localStorage.setItem("token", _token);
  showAuth();
}

/** Show when we're authenticated: hides login, shows real data */
function showAuth() {
  document.getElementById("need-auth").style.display = "none";
  document.getElementById("has-auth").style.display = "block";
  document.getElementById("username").textContent = username;

  populateFrom();
  populateTo();
  populateUserDropDown();
}

/** Handle register form: register, save auth, and show real data. */
document.getElementById("register-form").addEventListener("submit", async function (evt) {
  evt.preventDefault();

  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const first_name = document.getElementById("register-fname").value;
  const last_name = document.getElementById("register-lname").value;
  const phone = document.getElementById("register-phone").value;

  let res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, first_name, last_name, phone }),
  });
  res = await res.json();

  saveAuth(username, res.token);
});

/** Handle login: save auth & show real data. */
document.getElementById("login-form").addEventListener("submit", async function (evt) {
  evt.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  res = await res.json();

  saveAuth(username, res.token);
});

/** Get & show messages from user. */
async function populateFrom() {
  const $msgsFrom = document.getElementById("msgs-from");
  $msgsFrom.innerHTML = "";

  let res = await fetch(`${API}/users/${username}/from`, {
    headers: {
      "Authorization": _token,
    },
  });
  res = await res.json();

  for (let m of res.messages) {
    let text = m.body + " - " + m.to_user.username;
    const li = document.createElement("li");
    li.textContent = text;
    $msgsFrom.appendChild(li);
  }
}

/** Get & show messages to user. */
async function populateTo() {
  const $msgsTo = document.getElementById("msgs-to");
  $msgsTo.innerHTML = "";

  let res = await fetch(`${API}/users/${username}/to`, {
    headers: {
      "Authorization": _token,
    },
  });
  res = await res.json();

  for (let m of res.messages) {
    let text = m.body + " - " + m.from_user.username;
    const li = document.createElement("li");
    li.textContent = text;
    $msgsTo.appendChild(li);
  }
}

/** Populate list of users for send-to */
async function populateUserDropDown() {
  const dropdown = document.getElementById("newmsg-to");
  dropdown.innerHTML = "";

  let res = await fetch(`${API}/users`, {
    headers: {
      "Authorization": _token,
    },
  });
  res = await res.json();

  for (let { username } of res.users) {
    const option = document.createElement("option");
    option.textContent = username;
    option.value = username;
    dropdown.appendChild(option);
  }
}

/** Handle new messages submission: add, then repopulate lists. */
document.getElementById("new-message-form").addEventListener("submit", async function (evt) {
  evt.preventDefault();

  let to_username = document.getElementById("newmsg-to").value;
  let body = document.getElementById("newmsg-body").value;

  await fetch(`${API}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": _token,
    },
    body: JSON.stringify({ to_username, body }),
  });

  populateFrom();
  populateTo();

  document.getElementById("newmsg-to").value = "";
  document.getElementById("newmsg-body").value = "";
});

/** Logout: remove stored username/_token and re-show login */
document.getElementById("logout").addEventListener("click", function (evt) {
  document.getElementById("need-auth").style.display = "block";
  document.getElementById("has-auth").style.display = "none";
  _token = null;
  username = null;
  localStorage.removeItem("username");
  localStorage.removeItem("token");
});
