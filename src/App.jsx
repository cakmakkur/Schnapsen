import { useRef } from "react";
import ConfigsContainer from "./1-Containers/ConfigsContainer";
import MainPlayContainer from "./1-Containers/MainPlayContainer";
import Panel from "./1-Containers/Panel";
import ScoreboardContainer from "./1-Containers/ScoreboardContainer";

export default function App() {
  const mainPlayContainerRef = useRef();

  return (
    <div className="mainDiv">
      <MainPlayContainer ref={mainPlayContainerRef} />
      <Panel>
        <ScoreboardContainer />
        <ConfigsContainer mainPlayContainerRef={mainPlayContainerRef} />
      </Panel>
    </div>
  );
}
