// src/components/RoomList.js
import React, { useState, useEffect } from 'react';
import Room from './Room';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from the server
    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.map(room => (
        <Room key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
