import { Link } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function LocationCard({ location }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/location/${location.location_id}`}>
        <Typography variant="h4">{location.location_name}</Typography>
      </CardActionArea>
    </Card>
  );
}
