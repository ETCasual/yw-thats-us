import { type AppType } from "next/dist/shared/lib/utils";
import { Firestore } from "@/components/Init";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/lib/firebase";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Firestore>
        <Component {...pageProps} />
      </Firestore>
    </FirebaseAppProvider>
  );
};

export default MyApp;
