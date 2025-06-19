import { messaging, getToken } from "./firebase";
import { FCMAPI } from "./ApiLinks";
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
