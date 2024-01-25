import Card from "../3-Components/Card";

export default function CpuCards({ cpuHand }) {
  return (
    <div className="cpuCardsDiv">
      {cpuHand.map((c) => (
        <Card key={c.id} cardId={"backside"} />
      ))}
    </div>
  );
}
