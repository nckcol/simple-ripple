import React, { useRef, useEffect, useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";
import "./styles.css";
import useMeasure from "./useMeasure";

let count = 0;
const Circle = ({ x, y, size, maxSize, opacity }) => {
  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      width="10"
      height="10"
      style={{
        margin: "-5px",
        position: "absolute",
        left: x,
        top: y,
        transform: size.to(t => `scale(${t * (maxSize / 5)})`),
        opacity
      }}
    >
      <circle cx="5" cy="5" r="5" fill="currentColor" fill-opacity="0.1" />
    </animated.svg>
  );
};

const Card = () => {
  const cardEl = useRef();
  const [points, setPoints] = useState([]);

  const transitions = useTransition(points, item => item.key, {
    from: {
      size: 0,
      opacity: 0
    },
    enter: { opacity: 1, size: 1 },
    leave: {
      opacity: 0
    }
  });
  const { x, y, width, height } = useMeasure(cardEl);

  const handlePointerDown = useCallback(
    event => {
      const localX = event.clientX - x;
      const localY = event.clientY - y;
      const [a, b] = [localX, localY, width - localX, height - localY].sort(
        (a, b) => b - a
      );
      const dist = Math.sqrt(a * a + b * b);
      setPoints([
        {
          x: localX,
          y: localY,
          key: count++,
          maxSize: dist
        }
      ]);
    },
    [x, y, width, height]
  );

  const handlePointerUp = event => {
    setPoints([]);
  };

  useEffect(() => {
    cardEl.current.addEventListener("pointerdown", handlePointerDown, {
      passive: true
    });
    cardEl.current.addEventListener("pointerup", handlePointerUp, {
      passive: true
    });

    return () => {
      cardEl.current.removeEventListener("pointerdown", handlePointerDown, {
        passive: true
      });
      cardEl.current.removeEventListener("pointerup", handlePointerUp, {
        passive: true
      });
    };
  });

  return (
    <div className="Card" ref={cardEl}>
      {transitions.map(({ item, props, key }) => (
        <Circle
          key={key}
          x={item.x}
          y={item.y}
          size={props.size}
          maxSize={item.maxSize}
          opacity={props.opacity}
        />
      ))}
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
