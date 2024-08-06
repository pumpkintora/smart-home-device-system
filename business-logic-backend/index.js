const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const io = require('socket.io')(3003);

const { verifyJWT } = require("./middleware/verifyJWT");
const locationController = require("./controller/location.controller")
const deviceController = require("./controller/device.controller")
const notificationController = require("./controller/notification.controller")
const toggleDevicesOn = require("./cron/toggleDevicesOn")
const toggleDevicesOff = require("./cron/toggleDevicesOff")
const resetManualOverride = require("./cron/resetManualOverride")

const app = express();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
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

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

// Schedule the toggle functions to run every minute
cron.schedule('0 * * * *', () => {
  toggleDevicesOn();
  toggleDevicesOff();
});

// Schedule the manual override reset to run every day at 12 AM
cron.schedule('0 0 * * *', resetManualOverride);

// location API
app.post("/api/biz/location", verifyJWT, locationController.createLocationByUserId);
app.get("/api/biz/location/all", verifyJWT, locationController.getAllLocationByUserId);
app.get("/api/biz/location/:locationId", verifyJWT, locationController.getLocationByLocationId);
app.put("/api/biz/location/:locationId", verifyJWT, locationController.updateLocationByLocationId);
app.delete("/api/biz/location/:locationId", verifyJWT, locationController.deleteLocationByLocationId);
app.post("/api/biz/location/add-device", verifyJWT, locationController.addDeviceToLocation);

// device API
app.get("/api/biz/device/:locationId", verifyJWT, deviceController.getAllDeviceByLocationId);
app.get("/api/biz/device-type/all", verifyJWT, deviceController.getAllDeviceType);
app.put('/api/biz/device/:deviceId', verifyJWT, deviceController.updateDeviceByDeviceId);
app.post('/api/biz/device/:deviceId/on', verifyJWT, deviceController.turnOnDevice);
app.post('/api/biz/device/:deviceId/off', verifyJWT, deviceController.turnOffDevice);
app.delete('/api/biz/device/:deviceId', verifyJWT, deviceController.deleteDeviceByDeviceId);

// notification API
app.get("/api/biz/notification/:userId", verifyJWT, notificationController.getAllNotificationByUserId)
app.put("/api/biz/notification/read", verifyJWT, notificationController.readNotificationById)

const PORT = process.env.SERVER_DOCKER_PORT || 3002;

app.listen(PORT, () => {
  console.log(`running server at ${PORT}`);
});
