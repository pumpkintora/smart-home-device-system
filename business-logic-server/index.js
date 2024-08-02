const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { verifyJWT } = require("./middleware/verifyJWT");
const locationController = require("./controller/location.controller")
const deviceController = require("./controller/device.controller")

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

// location API
app.get("/location/all", verifyJWT, locationController.getAllLocationByUserId);
app.get("/location/:locationId", verifyJWT, locationController.getLocationByLocationId);
app.post("/location/add-device", verifyJWT, locationController.addDeviceToLocation);

// device API
app.get("/device/:locationId", verifyJWT, deviceController.getAllDeviceByLocationId);
app.get("/device-type/all", verifyJWT, deviceController.getAllDeviceType);
app.put('/device/:deviceId', verifyJWT, deviceController.updateDeviceByDeviceId);
app.delete('/device/:deviceId', verifyJWT, deviceController.deleteDeviceByDeviceId);

app.post("/location/", verifyJWT, (req, res) => {});

const PORT = process.env.SERVER_DOCKER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`running server at ${PORT}`);
});
