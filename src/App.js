import React, { useRef, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import "./styles.css";

const Circle = ({ size, opacity }) => {
  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      style={{ transform: size.interpolate(t => `scale(${t})`), opacity }}
    >
      <circle cx="5" cy="5" r="5" />
    </animated.svg>
  );
};

const Card = () => {
  const cardEl = useRef();
  const { size, opacity } = useSpring({
    from: {
      size: 0,
      opacity: 0
    },
    opacity: 1,
    size: 2
  });

  const handlePointerDown = () => {};

  useEffect(() => {
    cardEl.current.addEventListener("pointerdown", handlePointerDown, {
      passive: true
    });
    cardEl.current.addEventListener("pointerdown", handlePointerUp, {
      passive: true
    });
  });

  return (
    <div className="Card" ref={cardEl}>
      <Circle size={size} opacity={opacity} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Card />
    </div>
  );
}
