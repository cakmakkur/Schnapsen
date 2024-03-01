import Card from "../3-Components/Card";

export default function GameFinishedAnim({ side }) {
  return (
    <div className="gfd">
      <Card style={"animCard ac1"} cardId={"backside"} />
      <Card style={"animCard ac2"} cardId={"backside"} />
      <Card style={"animCard ac3"} cardId={"backside"} />
      <Card side={side} style={"animCard ac4"} cardId={"winner"} />
    </div>
  );
}
