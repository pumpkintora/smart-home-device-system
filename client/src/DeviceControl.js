// src/components/DeviceControl.js
import React from 'react';

const DeviceControl = ({ device, onChange }) => {
  const handleChange = (e) => {
    onChange(device.id, e.target.checked);
  };

  return (
    <div>
      <span>{device.name}</span>
      <input
        type="checkbox"
        checked={device.state}
        onChange={handleChange}
      />
    </div>
  );
};

export default DeviceControl;
