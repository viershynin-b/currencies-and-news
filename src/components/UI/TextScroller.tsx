import { useState } from "react";
import { useSpring, animated } from "react-spring";

interface ITextScroller {
  text: string;
}

const TextScroller = (props: ITextScroller) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: `translate(${window.innerWidth / 7}%,0)` },
    to: { transform: "translate(-100%,0)" },
    config: { duration: 11000 },
    reset: true,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <div key={key}>
      <animated.div style={scrolling}>{props.text}</animated.div>
    </div>
  );
};

export default TextScroller;
