const db = require("../db/mysql");

const getAllNotificationByUserId = (req, res) => {
  const user_id = req.userId;
  db.execute(
    "SELECT * FROM notifications WHERE user_id = ? AND isRead = 0;",
    [user_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
};

const readNotificationById = (req, res) => {
  const notifications = req.body;

  notifications.forEach((notification) => {
    const query = `
      UPDATE notifications
      SET isRead = 1
      WHERE notification_id = ?;
      `;

    db.query(query, [notification.notification_id], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
    });
  });
  res.send(`Read notification ok.`);
};

module.exports = {
  getAllNotificationByUserId,
  readNotificationById,
};
