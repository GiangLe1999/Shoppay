import { DotLoader } from "react-spinners";
import styled from "./styles.module.scss";

const StyledDotLoader2 = ({ loading }) => {
  return (
    <div className={styled.loader}>
      <DotLoader color="#1976d2" loading={loading} />
    </div>
  );
};

export default StyledDotLoader2;
