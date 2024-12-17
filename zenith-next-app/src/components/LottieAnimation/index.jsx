import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function LottieAnimation({ src, style }) {
  return <Player autoplay loop src={src} style={style} />;
}