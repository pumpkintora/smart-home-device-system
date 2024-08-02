const db = require('../db/mysql');

// Function to toggle devices off
const toggleDevicesOff = () => {
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0]; // Get the current time in HH:MM:SS format

    const toggleOffQuery = `
        UPDATE devices
        SET status = 'off'
        WHERE TIME(schedule_off) <= ?
    `;
    db.query(toggleOffQuery, [currentTime], (err, result) => {
        if (err) {
            console.error('Error toggling devices off:', err);
        } else {
            console.log('Devices toggled off:', result.affectedRows);
        }
    });
};

module.exports = toggleDevicesOff;
