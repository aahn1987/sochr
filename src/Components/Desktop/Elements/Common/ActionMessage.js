import { Snackbar, Alert } from "@mui/material";
import { ActionMessageStore } from "../../../../Store";
export default function ActionMessage() {
  const setsanckShow = ActionMessageStore((state) => state.setsanckShow);
  const sanckShow = ActionMessageStore((state) => state.sanckShow);
  const snackMessage = ActionMessageStore((state) => state.snackMessage);
  const snackSeverity = ActionMessageStore((state) => state.snackSeverity);
  return (
    <Snackbar
      open={sanckShow}
      autoHideDuration={3000}
      onClose={setsanckShow}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ top: "10px !important", right: "60px !important" }}
    >
      <Alert
        onClose={setsanckShow}
        severity={snackSeverity}
        variant="outlined"
        sx={{
          "& .MuiAlert-message": {
            textAlign: "center",
            width: "inherit",
            fontSize: "12px",
          },
          "& .MuiAlert-icon": {
            fontSize: "16px",
          },
          "& .MuiAlert-action": {
            display: "none",
          },
          bgcolor: "background.paper",
        }}
      >
        {snackMessage}
      </Alert>
    </Snackbar>
  );
}
