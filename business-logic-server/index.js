require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRound = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
// app.use(cors());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use (
    session ({
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
    port: process.env.DB_PORT || 3306
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send({ authenticated: false });
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ authenticated: false });
            } else {
                req.userId = decoded.user_id;
                next();
            }
        });
    }
};

app.get('/location/all', verifyJWT, (req, res) => {
    const user_id = req.userId;
    db.execute(
        "SELECT * FROM locations WHERE user_id = ?;",
        [user_id], 
        (err, result)=> {
            if (err) {
                res.send({err: err});
            } 
            res.send(result);
        }
    );
});

app.get('/location/:locationId', verifyJWT , (req, res) => {});

app.post('/location/', verifyJWT , (req, res) => {});

const PORT = process.env.SERVER_DOCKER_PORT || 3002;

app.listen(PORT, () => {
    console.log(`running server at ${PORT}`);
});