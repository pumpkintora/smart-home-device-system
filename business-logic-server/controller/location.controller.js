const db = require("../db/mysql");
const formatDateForSql = require("../utils/formatDateForSql")

const getAllLocationByUserId = (req, res) => {
  const user_id = req.userId;
  db.execute(
    "SELECT * FROM locations WHERE user_id = ?;",
    [user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
};

const getLocationByLocationId = (req, res) => {
  const location_id = req.params.locationId;
  db.execute(
    "SELECT * FROM locations WHERE location_id = ?;",
    [location_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
};

const addDeviceToLocation = (req, res) => {
  const { schedule_on, schedule_off, devicetype_id, location_id } = req.body;
  console.log(req.body);
  // Validate required fields
  if (
    schedule_on === undefined ||
    schedule_off === undefined ||
    devicetype_id === undefined ||
    location_id === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert the new device into the devices table
  const query = `
        INSERT INTO devices (schedule_on, schedule_off, devicetype_id, location_id)
        VALUES (?, ?, ?, ?);
        `;

  db.query(
    query,
    [formatDateForSql(schedule_on), formatDateForSql(schedule_off), devicetype_id, location_id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to add device" });
      }

      //   const query = `SELECT LAST_INSERT_ID();`

      //   res.status(201).json({ message: "Device added successfully" });

      // Get the ID of the newly inserted device
      const newDeviceId = result.insertId;

      // Retrieve the newly inserted device's data
      const selectQuery = `
          SELECT devices.*, devicetypes.type_name 
          FROM devices 
          JOIN devicetypes ON devices.devicetype_id = devicetypes.devicetype_id 
          WHERE device_id = ?
      `;

      db.query(selectQuery, [newDeviceId], (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve new device" });
        }

        // Return the newly inserted device data
        res.status(201).json(result[0]);
      });
    }
  );
};

module.exports = {
  getAllLocationByUserId,
  getLocationByLocationId,
  addDeviceToLocation,
};
