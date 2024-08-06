const db = require("../db/mysql");
const {
  createDeviceStatusChangeNotification,
} = require("../cron/notification");

// Function to toggle devices off
const toggleDevicesOff = () => {
  const now = new Date();
  const currentTime = now.toTimeString().split(" ")[0]; // Get the current time in HH:MM:SS format

  const selectAffectedQuery = `
        SELECT * FROM devices
        INNER JOIN locations ON locations.location_id = devices.location_id
        INNER JOIN devicetypes ON devicetypes.devicetype_id = devices.devicetype_id
        WHERE manual_override = FALSE AND status = 'on' AND ((TIME(schedule_off) < TIME(schedule_on) AND NOW() BETWEEN TIME(schedule_off) AND TIME(schedule_on))
          OR
          (TIME(schedule_on) < TIME(schedule_off) AND NOW() < TIME(schedule_off) AND NOW() < TIME(schedule_on))
          OR
          (TIME(schedule_on) < TIME(schedule_off) AND NOW() > TIME(schedule_off)));
    `;

  const toggleOffQuery = `
        UPDATE devices
        SET status = 'off'
        WHERE manual_override = FALSE AND status = 'on' AND ((TIME(schedule_off) < TIME(schedule_on) AND NOW() BETWEEN TIME(schedule_off) AND TIME(schedule_on))
          OR
          (TIME(schedule_on) < TIME(schedule_off) AND NOW() < TIME(schedule_off) AND NOW() < TIME(schedule_on))
          OR
          (TIME(schedule_on) < TIME(schedule_off) AND NOW() > TIME(schedule_off)));
    `;
  db.query(selectAffectedQuery, [], (err, selectedResult) => {
    if (err) {
      console.log(err);
      return;
    }
    db.query(toggleOffQuery, [], (err, result) => {
      if (err) {
        console.error("Error toggling devices off:", err);
      } else {
        console.log("Devices toggled off:", result.affectedRows);
      }
      if (selectedResult.length)
        createDeviceStatusChangeNotification(selectedResult, "off");
    });
  });
};

module.exports = toggleDevicesOff;
