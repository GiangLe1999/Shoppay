import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/store";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.scss";

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
