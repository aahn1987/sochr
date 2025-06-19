import { useEffect } from "react";
import Cookies from "js-cookie";
import { BASEURI } from "../../../Context/SysConfs";
import { UserLoginStore } from "../../../Store";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../Context/firebase";
export default function EmployeeContainer() {
  const setuserRole = UserLoginStore((state) => state.setuserRole);
  const setuserRef = UserLoginStore((state) => state.setuserRef);
  const setempSOC = UserLoginStore((state) => state.setempSOC);
  const setisLoggedIn = UserLoginStore((state) => state.setisLoggedIn);
  const DoLogout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userRef");
    Cookies.remove("empSOC");
    Cookies.remove("loggedIn");
    setuserRole("");
    setuserRef("");
    setempSOC("");
    setisLoggedIn(false);
    window.location.href = BASEURI;
  };
  useEffect(() => {
    // طلب إذن الإشعارات من المتصفح
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // الحصول على توكن FCM
        getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // ابعت التوكن للسيرفر لحفظه وإرسال الاشعارات عليه
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      } else {
        console.log("Notification permission denied");
      }
    });

    // استقبال الرسائل عند فتح التطبيق
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(
        `Notification received: ${payload.notification.title} - ${payload.notification.body}`
      );
      // هنا ممكن تعرض إشعار داخل التطبيق أو تحديث حالة UI
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      Employee Containe r{Cookies.get("userRole")} {Cookies.get("userRef")}{" "}
      {Cookies.get("empSOC")}
      <button onClick={DoLogout}>Logout</button>
    </div>
  );
}
