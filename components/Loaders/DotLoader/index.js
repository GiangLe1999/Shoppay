import styled from "./styles.module.scss";
import DotLoader from "react-spinners/DotLoader";

const StyledDotLoader = ({ loading }) => {
  return (
    <div className={styled.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default StyledDotLoader;
