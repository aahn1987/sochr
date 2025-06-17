importScripts(
  "https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDF9X5qxDdurOvAtqa0_rWZrcYQ9WXhnSA",
  authDomain: "sochrpayroll.firebaseapp.com",
  projectId: "sochrpayroll",
  storageBucket: "sochrpayroll.firebasestorage.app",
  messagingSenderId: "876743523671",
  appId: "1:876743523671:web:0f7ae19ab09e0170cc5212",
  measurementId: "G-8VETVDGMNX",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: "/logo192.png",
  });
});
