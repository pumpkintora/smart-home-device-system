import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../component/ResponsiveAppBar";
import DeviceCard from "../component/DeviceCard";
import DeviceModal from "../component/DeviceModal";
import LocationModal from "../component/LocationModal";
import { businessLogicAxiosInstance as axios } from "../utils/axios";

export default function Location() {
  const [loading, setLoading] = React.useState(true);
  const [devices, setDevices] = React.useState([]);
  const [allDeviceType, setAllDeviceType] = React.useState([]);
  const [location, setLocation] = React.useState(null);
  const [openDevice, setOpenDevice] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [device, setDevice] = React.useState(null);
  const navigate = useNavigate();
  const { locationId } = useParams();

  const addNewDevice = () => {
    setDevice(null);
    setOpenDevice(true);
  };

  const editDevice = (id) => {
    setDevice(devices.find((dev) => dev.device_id === id));
    setOpenDevice(true);
  };

  const editLocation = (id) => {
    setOpenLocation(true);
  };

  const handleDeleteLocation = () => {
    axios
      .delete(`/location/${locationId}`)
      .then((res) => console.log(res.data))
      .then(() => navigate("/"));
  };

  React.useEffect(() => {
    async function fetchData() {
      const devicesData = await axios.get(`/device/${locationId}`);
      const locationData = await axios.get(`/location/${locationId}`);
      const deviceTypeData = await axios.get(`/device-type/all`);
      setDevices(devicesData.data);
      setLocation(locationData.data[0]);
      setAllDeviceType(deviceTypeData.data);
      setLoading(false);
    }
    fetchData();
  }, [locationId]);

  return (
    <>
      <ResponsiveAppBar />
      {!loading && (
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="h4">{location?.location_name}</Typography>
              <Box>
                <Button variant="outlined" onClick={editLocation}>
                  Edit Location
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleDeleteLocation}
                  sx={{ ml: 2 }}
                >
                  Delete Location
                </Button>
              </Box>
            </Grid>
            {devices?.map((device) => (
              <Grid key={device.device_id} item xs={12} md={6}>
                <DeviceCard
                  device={device}
                  openDeviceModal={() => editDevice(device.device_id)}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea onClick={addNewDevice}>
                  <Typography variant="h4">Add New Device</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
          <DeviceModal
            open={openDevice}
            setOpen={setOpenDevice}
            device={device}
            allDeviceType={allDeviceType}
            setDevices={setDevices}
          />
          <LocationModal
            open={openLocation}
            setOpen={setOpenLocation}
            originalLocation={location}
          />
        </Container>
      )}
    </>
  );
}
