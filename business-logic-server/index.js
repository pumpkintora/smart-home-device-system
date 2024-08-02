const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { verifyJWT } = require("./middleware/verifyJWT");
const locationController = require("./controller/location.controller")
const deviceController = require("./controller/device.controller")

const toggleDevicesOn = require("./cron/toggleDevicesOn")
const toggleDevicesOff = require("./cron/toggleDevicesOff")
const resetManualOverride = require("./cron/resetManualOverride")

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


// Schedule the toggle functions to run every minute
cron.schedule('0 * * * *', () => {
  toggleDevicesOn();
  toggleDevicesOff();
});

// Schedule the manual override reset to run every day at 12 AM
cron.schedule('0 0 * * *', resetManualOverride);

// location API
app.post("/location", verifyJWT, locationController.createLocationByUserId);
app.get("/location/all", verifyJWT, locationController.getAllLocationByUserId);
app.get("/location/:locationId", verifyJWT, locationController.getLocationByLocationId);
app.put("/location/:locationId", verifyJWT, locationController.updateLocationByLocationId);
app.delete("/location/:locationId", verifyJWT, locationController.deleteLocationByLocationId);
app.post("/location/add-device", verifyJWT, locationController.addDeviceToLocation);

// device API
app.get("/device/:locationId", verifyJWT, deviceController.getAllDeviceByLocationId);
app.get("/device-type/all", verifyJWT, deviceController.getAllDeviceType);
app.put('/device/:deviceId', verifyJWT, deviceController.updateDeviceByDeviceId);
app.post('/device/:deviceId/on', verifyJWT, deviceController.turnOnDevice);
app.post('/device/:deviceId/off', verifyJWT, deviceController.turnOffDevice);
app.delete('/device/:deviceId', verifyJWT, deviceController.deleteDeviceByDeviceId);

app.post("/location/", verifyJWT, (req, res) => {});

const PORT = process.env.SERVER_DOCKER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`running server at ${PORT}`);
});
