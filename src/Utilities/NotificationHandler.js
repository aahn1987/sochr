import { useEffect, useState } from "react";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const VAPID_KEY = "YOUR_PUBLIC_VAPID_KEY";

export default function NotificationHandler() {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then(setPermission);
    }

    if (permission === "granted") {
      getToken(messaging, { vapidKey: VAPID_KEY })
        .then((token) => {
          console.log("FCM Token:", token);
          // send token to Laravel API here
        })
        .catch(console.error);

      onMessage(messaging, (payload) => {
        const { title, body } = payload.notification;
        new Notification(title, { body });
      });
    }
  }, [permission]);

  return null;
}
