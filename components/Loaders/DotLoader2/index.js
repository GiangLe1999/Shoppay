import { DotLoader } from "react-spinners";
import styled from "./styles.module.scss";

const StyledDotLoader2 = ({ loading }) => {
  return (
    <div className={styled.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default StyledDotLoader2;
