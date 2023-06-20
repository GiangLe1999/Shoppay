import React from "react";

import styled from "./styles.module.scss";
import Policy from "./Policy";
import Links from "./Links";
import Newsletter from "./Newsletter";
import Payment from "./Payment";
import Socials from "./Socials";
import Copyright from "./Copyright";

const Footer = ({ country }) => {
  return (
    <footer className={styled.footer}>
      <div className={styled.footer__container}>
        <Links />
        <Socials />
        <Newsletter />
      </div>
      <div className={styled.footer__container2}>
        <Payment />
        <Policy country={country} />
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
