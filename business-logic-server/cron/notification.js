const db = require("../db/mysql");

const createDeviceStatusChangeNotification = (selectedResult, status) => {
  const values = selectedResult.map((res) => [
    res.user_id,
    `${res.type_name} in ${res.location_name} is turned ${status}`,
  ]);

  const insertNotificationQuery = `
  INSERT INTO notifications (user_id, message) VALUES ?
`;
  db.query(insertNotificationQuery, [values], (err, results) => {
    if (err) {
      console.error("Error inserting notification:", err);
      return;
    }
    console.log("Notification inserted:", results.insertId);
  });
};

module.exports = { createDeviceStatusChangeNotification };
