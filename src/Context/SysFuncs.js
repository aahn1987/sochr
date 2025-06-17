import { getMessaging, getToken } from "firebase/messaging";
import { FCMAPI } from "./ApiLinks";
import axios from "axios";
export async function sendFcmTokenToLaravel(ref) {
  const messaging = getMessaging(); // تأكد أنك قمت بتهيئة Firebase
  const token = await getToken(messaging, {
    vapidKey: process.env.VAPID_KEY,
  });
  if (token) {
    await axios.post(FCMAPI, {
      fcm_token: token,
      soc_reference: ref,
    });
  }
}
export async function removeFcmTokenFromLaravel() {
  const messaging = getMessaging();
  const token = await getToken(messaging, {
    vapidKey: process.env.VAPID_KEY,
  });

  if (token) {
    await axios.delete("http://127.0.0.1:8000/api/fcm-token", {
      data: { fcm_token: token },
    });
    console.log("FCM token removed from backend");
  }
}
