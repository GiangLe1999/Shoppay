import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";
import { useRouter } from "next/router";

import styled from "./styles.module.scss";
import { signOut } from "next-auth/react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";

export default function SidebarItem({ item, visible, index }) {
  //SidebarItem nào có index bằng với tab thì stat show mặc định bằng true
  const [show, setShow] = useState(visible);
  const router = useRouter();

  return (
    <li>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}

      {/* Item nào có show bằng true thì sẽ đươc phép hiển thị các item con */}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                    slugify(link.name, { lower: true })
                      ? styled.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}${link.filter ? `__${link.filter}` : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li
                  className={
                    (router.query.q || "") ==
                    slugify(link.name, { lower: true })
                      ? styled.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  );
}
