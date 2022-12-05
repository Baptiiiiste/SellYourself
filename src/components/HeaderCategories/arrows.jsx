// Import 
import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({ children, onClick }) {
  return (
    <button  onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        userSelect: "none"
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const {scrollPrev} = React.useContext(VisibilityContext);

  return (
    <Arrow onClick={() => scrollPrev()}>◀</Arrow>
  );
}

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow  onClick={() => scrollNext()}>▶</Arrow>
  );
}
