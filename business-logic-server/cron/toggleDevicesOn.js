const db = require('../db/mysql');

// Function to toggle devices on
const toggleDevicesOn = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0]; // Get the current time in HH:MM:SS format

    const toggleOnQuery = `
        UPDATE devices
        SET status = 'on'
        WHERE TIME(schedule_on) <= ? 
        AND (TIME(schedule_off) IS NULL OR TIME(schedule_off) > ?)
        AND manual_override = FALSE
        AND status = 'off'
    `;
    db.query(toggleOnQuery, [currentTime, currentTime], (err, result) => {
        if (err) {
            console.error('Error toggling devices on:', err);
        } else {
            console.log('Devices toggled on:', result.affectedRows);
        }
    });
};

module.exports = toggleDevicesOn;