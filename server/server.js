const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
app.use(cookieParser(process.env.SESSIONSECRET)); // any string ex: 'keyboard cat'
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);
const users = [
  {
    userid: "akhil2715",
    password: "akhil1234",
  },
];
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    cookie: {
      maxAge: 36000,
      httpOnly: false,
      secure: false, // for normal http connection if https is there we have to set it to true
    },
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  return res.send({ status: 200 });
});

app.post("/login", (req, res) => {
  req.session.user = req.body?.email;
  req.session.sessionId = uuid.v1();
  let user = users.filter((obj) =>
    Object.keys(obj).some((userid) => obj[userid].includes(req.body.email))
  );
  if (
    user[0].userid === req.body.email &&
    user[0].password === req.body.password
  ) {
    return res.send({ status: 200, user: req.body.email });
  }
  return res.send({ status: 400 });
});

app.get("/test", (req, res) => {
  console.log(req.session);
  return res.send(req.session);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
