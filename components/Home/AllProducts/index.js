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

  const isMedium = useMediaQuery({ query: "(max-width: 1023px)" });
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" });

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
                  isLarge ? "grid__4" : isMedium ? "grid__3" : "grid__2"
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
