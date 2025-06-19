import { Box, colors, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      margin={"auto"}
    >
      <Typography variant="h4" color={colors.grey[600]}>
        404 Error, Page Not Found !!
      </Typography>
    </Box>
  );
}
