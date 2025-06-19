import { Box, Typography } from "@mui/material";
import { DualRingLoader } from "../../Loaders";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className="mainLoader"
    >
      <DualRingLoader />
      <Typography variant="body" color="primary" sx={{ mt: 3 }}>
        Loading contents
      </Typography>
    </Box>
  );
}
