import Card from "../3-Components/Card";

export default function GameFinishedAnim({ side }) {
  //HERE COMES THE ANIMATION
  return (
    <div className="gfd">
      <Card style={"animCard ac1"} cardId={"backside"} />
      <Card style={"animCard ac2"} cardId={"backside"} />
      <Card style={"animCard ac3"} cardId={"backside"} />
    </div>
  );
}
