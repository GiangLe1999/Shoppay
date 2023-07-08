import { RevealWrapper } from "next-reveal";
import React from "react";

export default function AnimateWrapper({
  origin = "top",
  children,
  delay = 0,
}) {
  return (
    <RevealWrapper className="load-hidden" origin={origin} delay={delay}>
      {children}
    </RevealWrapper>
  );
}
