import { PulseLoader } from "react-spinners";
import styled from "./styles.module.scss";

const StyledPulseLoader = ({ loading }) => {
  return (
    <div className={styled.loader}>
      <PulseLoader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default StyledPulseLoader;
