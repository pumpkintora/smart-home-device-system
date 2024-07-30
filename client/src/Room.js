// src/components/Room.js
import React, { useState } from 'react';
import DeviceControl from './DeviceControl';

const Room = ({ room }) => {
  const [devices, setDevices] = useState(room.devices);

  const handleDeviceChange = (deviceId, newState) => {
    setDevices(devices.map(device =>
      device.id === deviceId ? { ...device, state: newState } : device
    ));
  };

  return (
    <div>
      <h2>{room.name}</h2>
      {devices.map(device => (
        <DeviceControl
          key={device.id}
          device={device}
          onChange={handleDeviceChange}
        />
      ))}
    </div>
  );
};

export default Room;
