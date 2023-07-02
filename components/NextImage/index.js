/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React from "react";
import { shimmer, toBase64 } from "../ShimmerEffect";

export default function NextImage({ src, alt, ...rest }) {
  return (
    <Image
      fill={true}
      style={{ objectFit: "cover" }}
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...rest}
    />
  );
}
