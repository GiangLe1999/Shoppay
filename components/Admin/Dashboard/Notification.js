/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import Link from "next/link";

import styled from "./styles.module.scss";
import { notificationsData } from "@/data/notifications";

export default function Notification() {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styled.notiDropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styled.notiDropdown__svg}>
        <IoNewspaperSharp />
      </div>
      <div
        className={`${styled.notiDropdown__content} ${
          show ? styled.active : ""
        }`}
      >
        <div className={styled.notiDropdown__content_footer}>
          <Link href="/admin/dashboard/notifications">
            See all notifications
          </Link>
        </div>

        <div className={styled.notiDropdown__content_notifications}>
          {notificationsData.map((n, i) => (
            <>
              {n.type == "order" ? (
                <div
                  className={styled.notiDropdown__content_notification}
                  key={i}
                >
                  <img src={n.image} alt="" />
                  <p>
                    <span>{n.user}</span> has created new order, total of&nbsp;
                    {n.total}$
                  </p>
                </div>
              ) : (
                <div
                  className={styled.notiDropdown__content_notification}
                  key={i}
                >
                  <img src={n.image} alt="" />
                  <p>
                    <span>{n.user}</span> user has been created
                  </p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
