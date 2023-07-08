import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/store";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import Router from "next/router";

import "@/styles/globals.scss";
import Chatbot from "@/components/Chatbot";
import { useEffect, useState } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import StyledDotLoader from "@/components/Loaders/DotLoader";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      NProgress.start();
    };
    const end = () => {
      setLoading(false);
      NProgress.done();
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Shoppay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-500x500.png" />
      </Head>
      <Chatbot />
      {loading ? (
        <StyledDotLoader />
      ) : (
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
      )}
    </>
  );
}
