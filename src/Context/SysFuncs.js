import { messaging, getToken } from "./firebase";
import { FCMAPI, FCMAPID } from "./ApiLinks";
import axios from "axios";
export const sendFcmTokenToLaravel = async (socReference) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    if (token) {
      await axios.post(FCMAPI, {
        fcm_token: token,
        soc_reference: socReference,
      });
      console.log("Sending token:", token, "for soc:", socReference);
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};
export const removeFcmTokenFromLaravel = async (socReference) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    if (token) {
      await axios.delete(FCMAPID, {
        data: { fcm_token: token },
      });
      console.log("FCM token removed from backend");
    }
  } catch (error) {
    console.error("Error deleting FCM token:", error);
  }
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    if (token) {
      await axios.post(FCMAPI, {
        fcm_token: token,
        soc_reference: socReference,
      });
      console.log("Sending token:", token, "for soc:", socReference);
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};
export const SetTitle = (title) => {
  document.title = "StarsOrbit HRM - " + title;
};
