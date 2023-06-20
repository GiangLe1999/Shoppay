import React from "react";
import { FaFacebookF, FaTiktok, FaSnapchatGhost } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsInstagram, BsTwitter, BsYoutube, BsPinterest } from "react-icons/bs";

import styled from "./styles.module.scss";

const Socials = () => {
  return (
    <div className={styled.footer__socials}>
      <section>
        <h3>STAY CONNECTED</h3>
        <ul>
          <li>
            <a href="/" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsYoutube />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsPinterest />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <FaSnapchatGhost />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Socials;
