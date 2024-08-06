import * as React from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  Modal,
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
import { useParams } from "react-router-dom";

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

export default function DeviceModal({
  open,
  device,
  setOpen,
  allDeviceType,
  setDevices,
}) {
  const { locationId } = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setScheduleOn(null);
    setScheduleOff(null);
    setStatus(null);
  };
  const isEditDevice = Boolean(device);
  const [deviceType, setDeviceType] = React.useState(1);
  const [scheduleOn, setScheduleOn] = React.useState(null);
  const [scheduleOff, setScheduleOff] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const handleEditDevice = () => {
    // dayjs bug, 8 hours difference
    const d1 = new Date(scheduleOn);
    d1.setHours(d1.getHours() + 8);
    const d2 = new Date(scheduleOff);
    d2.setHours(d2.getHours() + 8);
    axios
      .put(`/device/${device.device_id}`, {
        schedule_on: d1.toISOString(),
        schedule_off: d2.toISOString(),
        devicetype_id: deviceType,
        location_id: locationId,
        status,
      })
      .then((res) =>
        setDevices((prevDevices) =>
          prevDevices.map((device) =>
            device.device_id === res.data.device_id
              ? { ...device, ...res.data }
              : device
          )
        )
      )
      .then(() => handleClose());
  };

  const handleAddNewDevice = () => {
    // dayjs bug, 8 hours difference
    const d1 = new Date(scheduleOn);
    d1.setHours(d1.getHours() + 8);
    const d2 = new Date(scheduleOff);
    d2.setHours(d2.getHours() + 8);
    axios
      .post("/location/add-device", {
        schedule_on: d1.toISOString(),
        schedule_off: d2.toISOString(),
        devicetype_id: deviceType,
        location_id: locationId,
        status,
      })
      .then((res) => setDevices((prev) => [...prev, res.data]))
      .then(() => handleClose());
  };

  const handleDeleteDevice = () => {
    axios
      .delete(`/device/${device.device_id}`)
      .then((res) =>
        setDevices((prev) =>
          prev.filter((thisDev) => thisDev.device_id !== device.device_id)
        )
      )
      .then(() => handleClose());
  };

  const handleToggle = (e, newValue) => {
    if (device) {
      if (status !== newValue) {
        axios
          .post(`/device/${device.device_id}/${newValue}`)
          .then((res) => setStatus(newValue));
      }
    } else setStatus(newValue);
  };

  React.useEffect(() => {
    if (isEditDevice) {
      setDeviceType(device.devicetype_id);
      setScheduleOn(device.schedule_on !== null ? device.schedule_on : null);
      setScheduleOff(device.schedule_off !== null ? device.schedule_off : null);
      setStatus(device.status);
    }
  }, [open]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditDevice ? "Edit Device" : "Add New Device"}
          </Typography>
          <Divider sx={{ margin: "20px 0px" }} />
          <Stack spacing={2} display={"flex"} justifyContent={"center"}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Device Type</InputLabel>
              <Select
                labelId="select-label"
                value={deviceType}
                label="Device Type"
                onChange={(e) => setDeviceType(e.target.value)}
              >
                {allDeviceType.map((adt) => (
                  <MenuItem key={adt.devicetype_id} value={adt.devicetype_id}>
                    {adt.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TimePicker
                label="Turn on at"
                value={scheduleOn ? dayjs(scheduleOn) : null}
                onChange={(newValue) => setScheduleOn(newValue)}
                // onChange={(newValue) => setScheduleOn(dayjs(newValue))}
              />
            </FormControl>
            <FormControl fullWidth>
              <TimePicker
                label="Turn off at"
                value={scheduleOff ? dayjs(scheduleOff) : null}
                onChange={(newValue) => setScheduleOff(newValue)}
                // onChange={(newValue) => setScheduleOff(dayjs(newValue))}
              />
            </FormControl>
            <ToggleButtonGroup
              color="primary"
              value={status}
              exclusive
              onChange={handleToggle}
              aria-label="Platform"
            >
              <ToggleButton value={"on"}>On</ToggleButton>
              <ToggleButton value={"off"}>Off</ToggleButton>
            </ToggleButtonGroup>
            <Stack spacing={1} direction={"row"} sx={{ width: "100%" }}>
              {isEditDevice && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleDeleteDevice}
                  sx={{ width: "inherit" }}
                >
                  Delete Device
                </Button>
              )}
              <Button
                onClick={isEditDevice ? handleEditDevice : handleAddNewDevice}
                sx={{ width: "inherit" }}
                variant="contained"
              >
                {isEditDevice ? "Edit Device" : "Add New Device"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
