import Card from "../3-Components/Card";

export default function CpuCards({ cpuHand, setCpuHand }) {
  return (
    <div className="cpuCardsDiv" style={{ border: "1px solid red" }}>
      {cpuHand.map((c) => (
        <Card key={c.id} cardId={"backside"} />
      ))}
    </div>
  );
}
