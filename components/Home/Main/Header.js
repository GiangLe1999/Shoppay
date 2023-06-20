import Link from "next/link";

import styled from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styled.header}>
      <h2>Suggested for you: </h2>
      <ul>
        <li>
          <Link href="">Electronics</Link>
        </li>
        <li>
          <Link href="">Sneakers</Link>
        </li>
        <li>
          <Link href="">Watches</Link>
        </li>
        <li>
          <Link href="">Gaming</Link>
        </li>
        <li>
          <Link href="">Accessories</Link>
        </li>
        <li>
          <Link href="">Machinery</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
