import Card from "../3-Components/Card";

export default function CpuCards({ cpuHand, cpuPlayAnm }) {
  return (
    <div className="cpuCardsDiv">
      {cpuHand.map((c) => (
        <Card key={c.id} cardId={"backside"} />
      ))}
      <Card cpuPlayAnm={cpuPlayAnm} cardId={"cpuPlayed"} />
    </div>
  );
}
