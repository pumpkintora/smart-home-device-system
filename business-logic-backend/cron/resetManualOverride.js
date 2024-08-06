const db = require('../db/mysql');

// Function to reset manual override
const resetManualOverride = () => {
    const query = `
        UPDATE devices
        SET manual_override = FALSE
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error resetting manual override:', err);
        } else {
            console.log('Manual override reset:', result.affectedRows);
        }
    });
};

module.exports = resetManualOverride;