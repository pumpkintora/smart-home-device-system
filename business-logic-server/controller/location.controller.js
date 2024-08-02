const db = require("../db/mysql");
const formatDateForSql = require("../utils/formatDateForSql");

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

const createLocationByUserId = (req, res) => {
  const { location_name } = req.body;
  const user_id = req.userId;
  const query = `INSERT INTO locations (location_name, user_id) VALUES (?, ?);`;
  db.query(query, [location_name, user_id], (err, result) => {
    if (err) {
      console.error("Error inserting:", err);
      return res.status(500).json({ error: "Failed to add device" });
    }
    // console.log(result)
    db.query(
      "SELECT * FROM locations WHERE location_id = ?;",
      [result.insertId],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        res.send(result);
      }
    );
  });
};

const updateLocationByLocationId = (req, res) => {
  const location_id = req.params.locationId;
  const { location_name, user_id } = req.body;
  // Validate that at least one field is provided for update
  if (location_name === undefined) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  if (user_id === undefined) {
    return res.status(400).json({ error: "User ID required." });
  }

  const updates = [];
  const values = [];

  if (location_name) {
    updates.push("location_name = ?");
    values.push(location_name);
  }

  values.push(location_id);
  values.push(user_id);

  const query = `
        UPDATE locations 
        SET ${updates.join(", ")} 
        WHERE location_id = ? AND user_id = ?;
        
    `;

  db.query(query, values, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    db.query(
      `SELECT * FROM locations WHERE location_id = ? AND user_id = ?;`,
      [location_id, user_id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        res.send(result);
      }
    );
  });
};

const deleteLocationByLocationId = (req, res) => {
  const { locationId } = req.params;

  const query = "DELETE FROM locations WHERE location_id = ?";
  db.query(query, [locationId], (err, result) => {
    if (err) {
      console.error("Error deleting device:", err);
      res.status(500).send("Server error");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Device not found");
      return;
    }
    res.send("Device deleted successfully");
  });
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
    [
      formatDateForSql(schedule_on),
      formatDateForSql(schedule_off),
      devicetype_id,
      location_id,
    ],
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
  createLocationByUserId,
  getAllLocationByUserId,
  updateLocationByLocationId,
  deleteLocationByLocationId,
  getLocationByLocationId,
  addDeviceToLocation,
};
