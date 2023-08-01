const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "reagan",
    password: "",
    database: "smart-brain",
  },
});

app.use(express.json());
app.use(cors());

//root
app.get("/", (req, res) => {
  res.send('success');
});

// SIGN IN
app.post("/signin", (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

// REGISTER
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// PROFILE LOOKUP
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });

//UPDATE RANK ON IMAGE SUBMISSION
app.put("/image", (req, res) => { image.handleImage(req, res, db) });

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

// PASSWORD ENCRYPTION FUNCTIONS
// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//   // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//   // result == false
// });
