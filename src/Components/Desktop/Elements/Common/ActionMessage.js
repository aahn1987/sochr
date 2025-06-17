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
    >
      <Alert
        onClose={setsanckShow}
        severity={snackSeverity}
        sx={{
          "& .MuiAlert-message": { textAlign: "center", width: "inherit" },
        }}
      >
        {snackMessage}
      </Alert>
    </Snackbar>
  );
}
