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
  const handleClose = () => setOpen(false);
  const isEditDevice = Boolean(device);
  const [deviceType, setDeviceType] = React.useState(1);
  const [scheduleOn, setScheduleOn] = React.useState(null);
  const [scheduleOff, setScheduleOff] = React.useState(null);
  const [manualStatus, setManualStatus] = React.useState(null);

  const handleEditDevice = () => {
    axios
      .put(`/device/${device.device_id}`, {
        schedule_on: scheduleOn,
        schedule_off: scheduleOff,
        devicetype_id: deviceType,
        location_id: locationId,
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
    axios
      .post("/location/add-device", {
        schedule_on: scheduleOn,
        schedule_off: scheduleOff,
        devicetype_id: deviceType,
        location_id: locationId,
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

  React.useEffect(() => {
    if (isEditDevice) {
      setDeviceType(device.devicetype_id);
      setScheduleOn(
        device.schedule_on !== null ? dayjs(device.schedule_on) : null
      );
      setScheduleOff(
        device.schedule_off !== null ? dayjs(device.schedule_off) : null
      );
      setManualStatus(device.manual_status);
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
                value={scheduleOn}
                onChange={(newValue) => setScheduleOn(newValue)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TimePicker
                label="Turn off at"
                value={scheduleOff}
                onChange={(newValue) => setScheduleOff(newValue)}
              />
            </FormControl>
            <ToggleButtonGroup
              color="primary"
              value={manualStatus}
              exclusive
              onChange={(e, newValue) => setManualStatus(newValue)}
              aria-label="Platform"
            >
              <ToggleButton value={true}>On</ToggleButton>
              <ToggleButton value={false}>Off</ToggleButton>
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
