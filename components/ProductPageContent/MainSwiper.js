/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

import styled from "./styles.module.scss";
import Image from "next/image";
import { Button } from "@mui/material";

const MainSwiper = ({ images, activeImg }) => {
  //Sửa lại format của Array ảnh để truyền SlideshowLightbox
  let lightBoxFormArr = images.map((img, i) => {
    return { src: img.url };
  });

  //State images của SlideshowLightbox
  const [ImagesArr, setImagesArr] = useState(lightBoxFormArr);

  const [active, setActive] = useState(0);
  const [showMaginify, setShowMagnify] = useState(false);

  const activeImgRef = useRef();
  const magnifyRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    setActive(0);
  }, [activeImg]);

  useEffect(() => {
    setImagesArr(
      images.map((img, i) => {
        return { src: img.url };
      })
    );
  }, [images]);

  const imgMouseMoveHandler = (e) => {
    // Hiện kính lúp
    setShowMagnify(true);

    // Ảnh được active
    const activeImg = activeImgRef.current;

    // Kính lúp
    const magnify = magnifyRef?.current;

    // Nếu đối tượng kính lúp bị gỡ thì thoát hàm
    if (!magnify) {
      return;
    }

    // Kích thước ảnh sau khi được zoom
    const scope = 2;
    const magnifyBgWidth = activeImg.offsetWidth * scope;
    const magnifyBgHeight = activeImg.offsetHeight * scope;

    // Vị trí của activeImg so với Document
    const activeImgtoDocTop =
      activeImg.getBoundingClientRect().top + window.scrollY;
    const activeImgtoDocLeft =
      activeImg.getBoundingClientRect().left + window.scrollX;

    // Vị trí của trỏ chuột so với activeImg
    // = Vị trí trỏ chuột so với document - Vị trí active Img so với Document
    let mouseOnImageX = e.pageX - activeImgtoDocLeft;
    let mouseOnImageY = e.pageY - activeImgtoDocTop;

    // Quy đổi ra phần trăm
    let mouseOnImageXPercent = (mouseOnImageX / activeImg.offsetWidth) * 100;
    let mouseOnImageYPercent = (mouseOnImageY / activeImg.offsetHeight) * 100;

    Object.assign(magnify.style, {
      top: e.clientY + "px",
      left: e.clientX + "px",
      backgroundImage: `url(${images[active].url})`,
      backgroundSize: `${magnifyBgWidth}px ${magnifyBgHeight}px`,
      backgroundPosition: `${mouseOnImageXPercent}% ${mouseOnImageYPercent}%`,
    });
  };

  const imgMouseLeaveHandler = (e) => {
    setShowMagnify(false);
  };

  //Click vào ảnh nào, ảnh đó được đẩy lên đầu mảng images truyền vào SlideshowLightbox
  const activeImgClickHandler = (activeImg) => {
    const newImagesArr = [...ImagesArr];
    const imgObj = newImagesArr.find((img, i) => {
      return img.src == activeImg.toString();
    });
    const imgObjIndex = newImagesArr.indexOf(imgObj);
    newImagesArr.splice(imgObjIndex, 1);
    newImagesArr.unshift({ src: activeImg });
    setImagesArr(newImagesArr);
  };

  const containerScrollHandler = (dir) => {
    const container = containerRef.current;
    let scrollAmount =
      dir === "up"
        ? container.scrollTop - (container.offsetHeight + 20)
        : container.scrollTop + (container.offsetHeight + 20);

    // if (scrollAmount > container.offsetHeight) {
    //   scrollAmount = 0;
    // }

    container.scrollTo({
      top: scrollAmount,
      behaviour: "smooth",
    });
  };

  return (
    <div className={styled.swiper}>
      <div className={styled.swiper__active}>
        {showMaginify && (
          <div className={styled.magnify} ref={magnifyRef}></div>
        )}

        {!showMaginify && (
          <div className={styled.hint}>
            <AiOutlinePlusCircle /> <span>Click or Hover to Zoom</span>
          </div>
        )}

        <SlideshowLightbox
          lightboxIdentifier="l2"
          framework="next"
          images={ImagesArr}
          theme="day"
        >
          <Image
            src={images[active].url}
            alt=""
            ref={activeImgRef}
            onMouseMove={imgMouseMoveHandler}
            onMouseLeave={imgMouseLeaveHandler}
            data-lightboxjs="l2"
            quality={80}
            onClick={() => activeImgClickHandler(images[active].url)}
            fill={true}
          />
        </SlideshowLightbox>
      </div>
      <div className={styled.swiper__list}>
        <Button
          variant="contained"
          onClick={() => containerScrollHandler("up")}
        >
          <MdOutlineKeyboardDoubleArrowUp />
        </Button>
        <div className={styled.swiper__list_container} ref={containerRef}>
          {images.map((img, index) => {
            return (
              <div
                className={`${styled.swiper__list_item} ${
                  index === active && styled.active
                }`}
                key={index}
                onMouseOver={() => setActive(index)}
              >
                <img src={img.url} alt="" />
              </div>
            );
          })}
        </div>
        <Button
          variant="contained"
          onClick={() => containerScrollHandler("down")}
        >
          <MdOutlineKeyboardDoubleArrowDown />
        </Button>
      </div>
    </div>
  );
};

export default MainSwiper;
