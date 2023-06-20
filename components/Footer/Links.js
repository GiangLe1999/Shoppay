/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

import styled from "./styles.module.scss";

const Links = () => {
  return (
    <div className={styled.footer__links}>
      {links.map((link, index) => {
        return (
          <ul key={index}>
            {/* Heading */}
            {index === 0 ? (
              <img src="/logo.png" alt="Logo footer" />
            ) : (
              <b>{link.heading}</b>
            )}

            {/* Items */}
            {link.links.map((link, index) => (
              <li key={index}>
                <Link href={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
};

const links = [
  {
    heading: "SHOPPAY",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "CUSTOMER SERVICE",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Terms and Conditions",
        link: "",
      },
      {
        name: "Consumers (Transactions)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];

export default Links;
