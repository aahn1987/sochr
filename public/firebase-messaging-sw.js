importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDF9X5qxDdurOvAtqa0_rWZrcYQ9WXhnSA",
  authDomain: "sochrpayroll.firebaseapp.com",
  projectId: "sochrpayroll",
  storageBucket: "sochrpayroll.firebaseapp.com",
  messagingSenderId: "876743523671",
  appId: "1:876743523671:web:0f7ae19ab09e0170cc5212",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
