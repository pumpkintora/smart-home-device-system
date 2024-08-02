import React from "react";
import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Avatar,
  Container,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, changePassword } from "../redux/userSlice";
import ResponsiveAppBar from "../component/ResponsiveAppBar";

export default function Profile(params) {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = React.useState({
    username: user.username || "",
    email: user.email || "",
  });
  const [passwords, setPasswords] = React.useState({
    currentPassword: "",
    newPassword: "",
  });
  console.log(user)

  const dispatch = useDispatch();

  const handleUpdateUser = () =>
    dispatch(updateUser({ ...userInfo, user_id: user.user_id }));

  const handleUpdatePassword = () =>
    dispatch(changePassword({ ...passwords, user_id: user.user_id }));

  return (
    <>
      <ResponsiveAppBar />

      <Container maxWidth="md">
        <Card sx={{ mt: 3, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">My Profile</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={handleUpdateUser}
                sx={{ float: "right" }}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Change Password</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="currentPassword"
                label="Current Password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="newPassword"
                label="New Password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={handleUpdatePassword}
                sx={{ float: "right" }}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
