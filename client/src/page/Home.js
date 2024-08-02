import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  Typography
} from "@mui/material";
import { businessLogicAxiosInstance as axios } from "../utils/axios";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import LocationCard from "../component/LocationCard";
import LocationModal from "../component/LocationModal";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const navigate = useNavigate();

  const addNewLocation = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    axios.get("/location/all").then((res) => {
      setLoading(false);
      setLocations(res.data);
    });
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      {!loading && (
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ padding: 2 }}>
            {locations?.map((loc) => (
              <Grid item xs={12} md={6}>
                <LocationCard key={loc.location_id} location={loc} />
              </Grid>
            ))}
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea onClick={addNewLocation}>
                  <Typography variant="h4">Add New Location</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <LocationModal open={open} setOpen={setOpen} setLocations={setLocations} />
        </Container>
      )}
    </>
  );
}
