import Link from "next/link";

import styled from "./styles.module.scss";

const Newsletter = () => {
  return (
    <div className={styled.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styled.footer__inputWrapper}>
        <input type="text" placeholder="Your Email Address" />
        <button className={styled.btn__primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{" "}
        <Link href="">our Privacy & Cookie Policy</Link>
      </p>
    </div>
  );
};

export default Newsletter;
