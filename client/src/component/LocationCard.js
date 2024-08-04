import { Link, useNavigate } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function LocationCard({ location }) {
  const navigate = useNavigate()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/location/${location.location_id}`)}>
        <Typography variant="h4">{location.location_name}</Typography>
      </CardActionArea>
    </Card>
  );
}
