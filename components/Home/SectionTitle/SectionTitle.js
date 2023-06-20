import { GiAmpleDress } from "react-icons/gi";
import { ImKeyboard } from "react-icons/im";
import { FaHotjar } from "react-icons/fa";
import { BsFillHouseUpFill } from "react-icons/bs";

import styled from "./styles.module.scss";

const SectionTitle = ({ title, icon, color }) => {
  return (
    <div
      className={styled.wrapper}
      style={{ color: `${color}`, borderBottom: `1px solid ${color}` }}
    >
      <h2>{title}</h2>
      {icon === "women" ? (
        <GiAmpleDress />
      ) : icon === "gamer" ? (
        <ImKeyboard />
      ) : icon === "house" ? (
        <BsFillHouseUpFill />
      ) : icon === "featured" ? (
        <FaHotjar />
      ) : (
        ""
      )}
    </div>
  );
};

export default SectionTitle;
