import React, { useState } from "react";

import styled from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import { useMediaQuery } from "react-responsive";
import { Button } from "@mui/material";
import { MdOutlineExpandMore } from "react-icons/md";
import { RevealWrapper } from "next-reveal";
import AnimateWrapper from "@/components/AnimateWrapper";

export default function AllProducts({ products }) {
  const [visible, setVisible] = useState(8);

  const isLarge = useMediaQuery({ minWidth: 1033 });
  const isMedium = useMediaQuery({ minWidth: 1005, maxWidth: 1032 });
  const isMedium2 = useMediaQuery({ minWidth: 944, maxWidth: 1004 });
  const isMedium3 = useMediaQuery({ minWidth: 876, maxWidth: 943 });
  const isMedium4 = useMediaQuery({ minWidth: 825, maxWidth: 875 });
  const isMedium5 = useMediaQuery({ minWidth: 783, maxWidth: 824 });
  const isMedium6 = useMediaQuery({ minWidth: 741, maxWidth: 782 });
  const isMedium7 = useMediaQuery({ minWidth: 701, maxWidth: 740 });
  const isMedium8 = useMediaQuery({ minWidth: 651, maxWidth: 700 });
  const isMedium9 = useMediaQuery({ minWidth: 610, maxWidth: 650 });
  const isSmall = useMediaQuery({ minWidth: 535, maxWidth: 609 });
  const isSmall2 = useMediaQuery({ minWidth: 484, maxWidth: 534 });
  const isSmall3 = useMediaQuery({ minWidth: 445, maxWidth: 483 });
  const isSmall4 = useMediaQuery({ minWidth: 401, maxWidth: 444 });
  const isSmall5 = useMediaQuery({ maxWidth: 400 });

  const showMoreHandler = () => {
    setVisible((prev) => prev + 8);
  };

  return (
    <>
      <div className={styled.allProducts__container}>
        <div className={styled.allProducts__content}>
          {products.slice(0, visible).map((product, index) => (
            <AnimateWrapper delay={50 * index} key={product._id}>
              <ProductCard
                product={product}
                className={
                  isLarge
                    ? "grid__4"
                    : isMedium
                    ? "grid__3"
                    : isMedium2
                    ? "grid__3_2"
                    : isMedium3
                    ? "grid__3_3"
                    : isMedium4
                    ? "grid__2"
                    : isMedium5
                    ? "grid__2_2"
                    : isMedium6
                    ? "grid__2_3"
                    : isMedium7
                    ? "grid__2_4"
                    : isMedium8
                    ? "grid__2_5"
                    : isMedium9
                    ? "grid__2_6"
                    : isSmall
                    ? "grid__1"
                    : isSmall2
                    ? "grid__1_2"
                    : isSmall3
                    ? "grid__1_3"
                    : isSmall4
                    ? "grid__1_4"
                    : isSmall5
                    ? "grid__1_5"
                    : "grid__2"
                }
              />
            </AnimateWrapper>
          ))}
        </div>
        <h4 className={styled.allProducts__title}>All Products</h4>
      </div>
      <div className={styled.allProducts__moreBtn}>
        <Button variant="contained" onClick={showMoreHandler}>
          Show more <MdOutlineExpandMore />
        </Button>
      </div>
    </>
  );
}
