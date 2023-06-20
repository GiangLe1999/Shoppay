import Link from "next/link";
import { ImHome } from "react-icons/im";
import { GrFormNext } from "react-icons/gr";

import styled from "./styles.module.scss";

const BreadCrumb = ({ category, categoryLink, subCategories }) => {
  return (
    <div className={styled.wrapper}>
      <Link href="/">
        <ImHome />
        Home
      </Link>
      <GrFormNext /> <Link href={categoryLink}>
        {category}
      </Link> <GrFormNext />{" "}
      {subCategories.map((sub, index) => (
        <span key={index}>
          {sub.name} <GrFormNext />{" "}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumb;
