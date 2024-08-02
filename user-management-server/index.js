require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRound = 10;

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: process.env.DB_USER || "root",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "smarthome",
  port: process.env.DB_PORT || 3306,
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(400).send({ tokenNotProvided: true });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(400).send({ authenticated: false });
      } else {
        req.userId = decoded.user_id;
        next();
      }
    });
  }
};

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.execute(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send({ authenticated: true });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.execute(
    "SELECT * FROM users WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const token = jwt.sign(
              { user_id: result[0].user_id },
              "jwtSecret",
              {
                expiresIn: 300,
              }
            );
            delete result[0].password;
            res.json({
              authenticated: true,
              token: token,
              user: result[0],
            });
          } else {
            res.json({
              authenticated: false,
              message: "Wrong username password",
            });
          }
        });
      } else {
        res.json({ authenticated: false, message: "no user exists" });
      }
    }
  );
});

app.put("/user/:userId", verifyJWT, (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  const query = "UPDATE users SET username = ?, email = ? WHERE user_id = ?";
  db.query(query, [username, email, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Server error");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, result) => {
        delete result[0].password;
        res.send(result[0]);
    })
  });
});

app.post("/user/:userId/change-password", verifyJWT, (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Fetch the current password hash from the database
  const query = "SELECT password FROM users WHERE user_id = ?";
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).send("Server error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    const storedPassword = results[0].password;

    // Compare the current password with the stored hash
    const passwordMatch = await bcrypt.compare(currentPassword, storedPassword);
    if (!passwordMatch) {
      res.status(401).send("Current password is incorrect");
      return;
    }

    // Hash the new password
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = "UPDATE users SET password = ? WHERE user_id = ?";
      db.query(updateQuery, [hashedPassword, userId], (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          res.status(500).send("Server error");
          return;
        }
        res.send("Password changed successfully");
      });
    } catch (error) {
      console.error("Error hashing new password:", error);
      res.status(500).send("Server error");
    }
  });
});

const PORT = process.env.SERVER_DOCKER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`running server at ${PORT}`);
});
