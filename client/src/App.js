import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Routes from "./routes";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes />
    </LocalizationProvider>
  );
}

export default App;
