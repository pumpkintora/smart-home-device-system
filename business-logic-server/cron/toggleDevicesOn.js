const db = require("../db/mysql");

// Function to toggle devices on
const toggleDevicesOn = () => {
  const now = new Date();
  const currentTime = now.toTimeString().split(" ")[0]; // Get the current time in HH:MM:SS format

  const selectAffectedQuery = `
        SELECT * FROM devices
        WHERE TIME(schedule_on) <= ?
        AND manual_override = FALSE
        AND (status = 'off' OR status IS NULL);
    `;

  const toggleOnQuery = `
        UPDATE devices
        SET status = 'on'
        WHERE TIME(schedule_on) <= ? 
        AND manual_override = FALSE
        AND (status = 'off' OR status IS NULL);
    `;
  db.query(
    selectAffectedQuery,
    [currentTime],
    (err, selectedResult) => {
      console.log(selectedResult);
      db.query(
        toggleOnQuery,
        [currentTime],
        (err, updatedResult) => {
          console.log("Devices toggled on:", updatedResult.affectedRows);
          console.log(updatedResult);
          //   const notificationMessage = `Device ${device_id} status changed to ${status}`;
          //   const insertNotification =
          //     "INSERT INTO notifications (user_id, message) VALUES (?, ?)";
          //   db.query(
          //     insertNotification,
          //     [user_id, notificationMessage],
          //     (err, result) => {
          //       if (err) {
          //         console.error("Error inserting notification:", err);
          //         return res.status(500).send("Server error");
          //       }

          //       const notification = {
          //         user_id,
          //         message: notificationMessage,
          //         read: false,
          //       };
          //       io.emit("notification", notification); // Emit notification to all connected clients

          //       res.send("Device status updated and notification sent");
          //     }
          //   );
        }
      );
    }
  );
};

module.exports = toggleDevicesOn;
