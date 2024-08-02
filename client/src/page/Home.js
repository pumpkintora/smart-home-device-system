import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { businessLogicAxiosInstance as axios } from "../utils/axios";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import LocationCard from "../component/LocationCard";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true);
  const [locations, setLocations] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("/location/all").then((res) => {
      setLoading(false);
      setLocations(res.data)
    });
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      {!loading && <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {locations?.map((loc) => <Grid item xs={12} md={6}>
            <LocationCard key={loc.location_id} location={loc} />
          </Grid>)}
        </Grid>
      </Container>}
    </>
  );
}
