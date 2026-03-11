function getUsers() {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  } else {
    return {};
  }
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function registerUser() {
  let username = document.getElementById("regUsername").value;
  let password = document.getElementById("regPassword").value;
  let confirmPassword = document.getElementById("regConfirmPassword").value;

  if (username === "" || password === "" || confirmPassword === "") {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let users = getUsers();

  if (users[username]) {
    alert("Username already exists");
    return;
  }

  users[username] = {
    password: password,
    notes: []
  };

  setUsers(users);

  alert("Registration successful");
  window.location.href = "index.html";
}

function loginUser() {
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    alert("Please enter username and password");
    return;
  }

  let users = getUsers();

  if (!users[username]) {
    alert("User not found. Please register first.");
    return;
  }

  if (users[username].password !== password) {
    alert("Wrong password");
    return;
  }

  localStorage.setItem("currentUser", username);
  alert("Login successful");
  window.location.href = "dashboard.html";
}

function checkLogin() {
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "index.html";
  }
}

function saveNote() {
  let currentUser = localStorage.getItem("currentUser");
  let noteText = document.getElementById("noteInput").value;

  if (noteText.trim() === "") {
    alert("Please write a note");
    return;
  }

  let users = getUsers();

  users[currentUser].notes.push({
    text: noteText,
    time: new Date().toLocaleString()
  });

  setUsers(users);
  document.getElementById("noteInput").value = "";
  loadNotes();
}

function loadNotes() {
  let currentUser = localStorage.getItem("currentUser");
  let notesContainer = document.getElementById("notesContainer");

  if (!currentUser || !notesContainer) {
    return;
  }

  let users = getUsers();
  let notes = users[currentUser].notes;

  let output = "";

  if (notes.length === 0) {
    output = "<p>No notes yet</p>";
  } else {
    for (let i = 0; i < notes.length; i++) {
      output += "<div style='border:1px solid #ccc; padding:10px; margin-top:10px;'>";
      output += "<b>" + notes[i].time + "</b>";
      output += "<p>" + notes[i].text + "</p>";
      output += "</div>";
    }
  }

  notesContainer.innerHTML = output;
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
