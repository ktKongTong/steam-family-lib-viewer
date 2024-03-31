import React from "react";

export const Overlay = (
  {
    onClick
  }:{
    onClick?: ()=>void
  }
) => (
  <div
    className="overlay bg-blend-darken top-0 bottom-0 left-1/2 bg-black/[.8] fixed  z-20 -translate-x-1/2 h-full w-full"
    onClick={onClick}
  >
    <div>

    </div>
  </div>
);