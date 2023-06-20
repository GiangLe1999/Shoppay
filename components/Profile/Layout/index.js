import Head from "next/head";

import styled from "./styles.module.scss";
import Header from "@/components/Header";
import Sidebar from "./Sidebar";

export default function Layout({ session, tab, children }) {
  return (
    <div className={styled.layout}>
      <Head>
        <title>{session?.name}</title>
      </Head>
      <Header />
      <div className={styled.layout__container}>
        <Sidebar data={{ image: session?.image, name: session?.name, tab }} />
        <div className={styled.layout__content}>{children}</div>
      </div>
    </div>
  );
}
