const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const connectToMongo = require("./db/db.js");
const Register = require("./models/register.js");
const { json } = require("express");
const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 8080;

// configure dotenv
dotenv.config();

// database config
connectToMongo();

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.urlencoded({ extended: false }));

// rest api
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/ques2", (req, res) => {
  res.render("ques2");
});

app.get("/ques3", (req, res) => {
  res.render("ques3");
});

app.get("/ques4", (req, res) => {
  res.render("ques4");
});

app.get("/ques5", (req, res) => {
  res.render("ques5");
});

app.get("/final", (req, res) => {
  res.render("final");
});

app.get("/index", (req, res) => {
  res.render("index");
});

// create a new user in database
app.post("/register", async (req, res) => {
  try {
    const registerUser = new Register({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const registered = await registerUser.save();
    res.status(201).render("ques1");
  } catch (error) {
    res.status(400).send(error);
  }
});

// login check
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });

    if (useremail.password === password) {
      res.status(201).render("ques1");
    } else {
      res.send("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//run listen
app.listen(port, () => {
  console.log(
    `TreasureHuntGame backend listening on port ${port}`.bgCyan.white
  );
});
