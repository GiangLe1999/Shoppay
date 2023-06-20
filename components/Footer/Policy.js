import Link from "next/link";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";

import styled from "./styles.module.scss";

const Policy = ({ country }) => {
  return (
    <div className={styled.footer__policy}>
      <section>
        <ul>
          {data.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.link}>{link.name}</Link>
              </li>
            );
          })}
          <li>
            <a href="">
              <IoLocationSharp /> <span>{country?.name}</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];

export default Policy;
