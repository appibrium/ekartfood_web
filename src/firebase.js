import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBli_JiyYxARqsPgzBgaVEabxnbmEIyCqw",
  authDomain: "ekartfood-1e632.firebaseapp.com",
  databaseURL: "https://ekartfood-1e632-default-rtdb.firebaseio.com",
  projectId: "ekartfood-1e632",
  storageBucket: "ekartfood-1e632.firebasestorage.app",
  messagingSenderId: "168461457671",
  appId: "1:168461457671:web:572c7a0ba3e444db08cda2",
  measurementId: "G-S2755GVVQ2"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BIYqKZ2ZlXRJYZX_iU7oYymqHZ1B0d8MVsYMoEPX_eFtezlxZ_V4JooCxS8ks857ylCVLewTtgHFxc6I8iBi7h4",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
