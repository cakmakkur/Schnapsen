import { useEffect, useRef } from "react";

export default function PlayerWonAnimation() {
  const animationDiv = useRef(null);
  // const intervalRef = useRef(null);
  // const [positionX, setPositionX] = useState(null)
  // const [positionY, setPositionY] = useState(null)

  const randomPosition = () => {
    const pos = {
      top: Math.random() * 100 + "vh",
      left: Math.random() * 100 + "vw",
    };
    return pos;
  };

  const colors = ["red", "yellow", "green", "orange", "lightblue", "gray"];

  const randomColor = () => {
    const randomIndex = Math.round(Math.random() * 6);
    console.log(colors[randomIndex]);
    return colors[randomIndex];
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      animationDiv.current.style.transform = "translateY(150vh)";
      animationDiv.current.style.opacity = 0;
    });
  }, []);

  const spans = Array.from({ length: 100 }, (_, index) => (
    <span
      key={index}
      className="confetti"
      style={{
        top: `-${randomPosition().top}`,
        left: randomPosition().left,
        backgroundColor: randomColor(),
      }}
    ></span>
  ));

  return (
    <div ref={animationDiv} className="animationDiv">
      {spans}
    </div>
  );
}
