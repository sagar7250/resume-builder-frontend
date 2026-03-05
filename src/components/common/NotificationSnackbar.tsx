import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearNotification } from "../../store/slices/uiSlice";

export default function NotificationSnackbar() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.ui.notification);

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={4000}
      onClose={() => dispatch(clearNotification())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {notification ? (
        <Alert
          severity={notification.type}
          variant="filled"
          onClose={() => dispatch(clearNotification())}
          sx={{ borderRadius: 3 }}
        >
          {notification.message}
        </Alert>
      ) : <div />}
    </Snackbar>
  );
}