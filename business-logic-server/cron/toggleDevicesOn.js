const db = require("../db/mysql");
const {
  createDeviceStatusChangeNotification,
} = require("../cron/notification");

// Function to toggle devices on
const toggleDevicesOn = () => {
  const now = new Date();
  const currentTime = now.toTimeString().split(" ")[0]; // Get the current time in HH:MM:SS format

  const selectAffectedQuery = `
        SELECT * FROM devices
        INNER JOIN locations ON locations.location_id = devices.location_id
        INNER JOIN devicetypes ON devicetypes.devicetype_id = devices.devicetype_id
        WHERE manual_override = FALSE AND status = 'off' AND ((TIME(schedule_on) < TIME(schedule_off) AND NOW() BETWEEN TIME(schedule_on) AND TIME(schedule_off))
          OR
          (TIME(schedule_off) < TIME(schedule_on) AND NOW() < TIME(schedule_on) AND NOW() < TIME(schedule_off))
          OR
          (TIME(schedule_off) < TIME(schedule_on) AND NOW() > TIME(schedule_on)));
    `;

  const toggleOnQuery = `
        UPDATE devices
        SET status = 'on'
        WHERE manual_override = FALSE AND status = 'off' AND ((TIME(schedule_on) < TIME(schedule_off) AND NOW() BETWEEN TIME(schedule_on) AND TIME(schedule_off))
          OR
          (TIME(schedule_off) < TIME(schedule_on) AND NOW() < TIME(schedule_on) AND NOW() < TIME(schedule_off))
          OR
          (TIME(schedule_off) < TIME(schedule_on) AND NOW() > TIME(schedule_on)));
    `;
  db.query(selectAffectedQuery, [], (err, selectedResult) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(selectedResult);
    db.query(toggleOnQuery, [], (err, updatedResult) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Devices toggled on:", updatedResult?.affectedRows);
      console.log(updatedResult);
      if (selectedResult.length) createDeviceStatusChangeNotification(selectedResult, "on");
    });
  });
};

module.exports = toggleDevicesOn;
