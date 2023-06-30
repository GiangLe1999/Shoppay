/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React from "react";

export default function NextImage({ src, alt, ...rest }) {
  return (
    <Image
      fill={true}
      style={{ objectFit: "cover" }}
      src={src}
      alt={alt}
      {...rest}
    />
  );
}
