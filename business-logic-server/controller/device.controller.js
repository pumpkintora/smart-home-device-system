const db = require("../db/mysql");
const formatDateForSql = require("../utils/formatDateForSql")

const getAllDeviceByLocationId = (req, res) => {
  const location_id = req.params.locationId;
  db.execute(
    "SELECT * FROM devices JOIN devicetypes ON devices.devicetype_id = devicetypes.devicetype_id WHERE location_id = ?;",
    [location_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
};

const getAllDeviceType = (req, res) => {
  db.execute("SELECT * FROM devicetypes;", [], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
};

const updateDeviceByDeviceId = (req, res) => {
  const device_id = req.params.deviceId;
  const { schedule_on, schedule_off, devicetype_id, manual_status } = req.body;

  // Validate that at least one field is provided for update
  if (
    schedule_on === undefined &&
    schedule_off === undefined &&
    devicetype_id === undefined &&
    manual_status === undefined
  ) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  // Build the query dynamically based on provided fields
  const updates = [];
  const values = [];

  if (schedule_on) {
    updates.push("schedule_on = ?");
    values.push(formatDateForSql(schedule_on));
  }
  if (schedule_off) {
    updates.push("schedule_off = ?");
    values.push(formatDateForSql(schedule_off));
  }
  if (devicetype_id) {
    updates.push("devicetype_id = ?");
    values.push(devicetype_id);
  }
  if (manual_status) {
    updates.push("manual_status = ?");
    values.push(manual_status);
  }

  // Add the device_id to the values array for the WHERE clause
  values.push(device_id);

  const query = `
        UPDATE devices 
        SET ${updates.join(", ")} 
        WHERE device_id = ?
    `;

  // Execute the update query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing update query:", err);
      return res.status(500).json({ error: "Failed to update device" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Device not found" });
    }

    // Return the updated device data
    const selectQuery = `
            SELECT devices.*, devicetypes.type_name 
            FROM devices 
            JOIN devicetypes ON devices.devicetype_id = devicetypes.devicetype_id 
            WHERE devices.device_id = ?
        `;

    db.query(selectQuery, [device_id], (err, result) => {
      if (err) {
        console.error("Error executing select query:", err);
        return res
          .status(500)
          .json({ error: "Failed to retrieve updated device data" });
      }

      res.status(200).send(result[0]);
    });
  });
};

const deleteDeviceByDeviceId =  (req, res) => {
  const { deviceId } = req.params;

  const query = 'DELETE FROM devices WHERE device_id = ?';
  db.query(query, [deviceId], (err, result) => {
      if (err) {
          console.error('Error deleting device:', err);
          res.status(500).send('Server error');
          return;
      }
      if (result.affectedRows === 0) {
          res.status(404).send('Device not found');
          return;
      }
      res.send('Device deleted successfully');
  });
}

module.exports = {
  getAllDeviceByLocationId,
  getAllDeviceType,
  updateDeviceByDeviceId,
  deleteDeviceByDeviceId,
};
