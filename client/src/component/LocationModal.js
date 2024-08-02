import * as React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Stack,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { businessLogicAxiosInstance as axios } from "../utils/axios";
import { useParams, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LocationModal({ open, setOpen, originalLocation, setLocations }) {
  const { user } = useSelector((state) => state.user);
  const [location, setLocation] = React.useState({
    location_name: "",
    user_id: user?.user_id,
  });
  const isEditLocation = Boolean(originalLocation);

  const handleEditLocation = () => {
    axios
      .put(`/location/${location.location_id}`, location)
      .then((res) => {
        setLocation(res.data);
        setOpen(false);
      });
  };

  const handleAddNewLocation = () => {
    axios
      .post("/location", location)
      .then((res) => {
        setLocations(prev => [...prev, ...res.data])
        setOpen(false)
      })
  };

  React.useEffect(() => {
    if (isEditLocation) {
      setLocation(originalLocation);
    }
  }, [open]);

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditLocation ? "Edit Location" : "Add New Location"}
          </Typography>
          <Divider sx={{ margin: "20px 0px" }} />
          <Stack spacing={2} display={"flex"} justifyContent={"center"}>
            <TextField
              label="Location Name"
              variant="outlined"
              value={location.location_name}
              onChange={(e) =>
                setLocation((prev) => ({
                  ...prev,
                  location_name: e.target.value,
                }))
              }
            />
            <Stack spacing={1} direction={"row"} sx={{ width: "100%" }}>
              <Button
                onClick={
                  isEditLocation ? handleEditLocation : handleAddNewLocation
                }
                sx={{ width: "inherit" }}
                variant="contained"
              >
                {isEditLocation ? "Edit Location" : "Add New Location"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
