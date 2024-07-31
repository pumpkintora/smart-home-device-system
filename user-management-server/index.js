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
        methods: ["GET", "POST"],
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

app.post('/register', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password; 

    bcrypt.hash(password,saltRound, (err, hash) => {

        if (err) {
            console.log(err)
        }
        db.execute( 
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash], 
            (err, result)=> {
                console.log(err);
            }
        );
    })
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

app.get('/isUserAuth', verifyJWT , (req, res) => {
    res.send({ authenticated: true })
})

app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password; 

    db.execute(
        "SELECT * FROM users WHERE username = ?;",
        [username], 
        (err, result)=> {
            if (err) {
                res.send({err: err});
            } 

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        const token = jwt.sign({ user_id: result[0].user_id }, "jwtSecret", {
                            expiresIn: 300,
                        })
                        res.json({
                            authenticated: true, 
                            token: token, 
                            user: { 
                                username: result[0].username,
                                user_id: result[0].user_id,
                            }
                        });
                    } else{
                        res.json({authenticated: false, message: "Wrong username password"}); 
                    }
                })
            } else {
                res.json({authenticated: false, message: "no user exists"});
            }
        }
    );
});

const PORT = process.env.SERVER_DOCKER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`running server at ${PORT}`);
});