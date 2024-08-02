import { Stack } from "@mui/material";

export default function CardContainer({ children }) {
  return (
    <Stack
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={3}
      sx={{ height: "100%" }}
    >
      {children}
    </Stack>
  );
}
