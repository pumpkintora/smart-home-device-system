import { Link } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function DeviceCard({ device, openDeviceModal }) {
  return (
    <Card>
      <CardActionArea onClick={openDeviceModal}>
        <Typography variant="h4">{device.type_name}</Typography>
      </CardActionArea>
    </Card>
  );
}
