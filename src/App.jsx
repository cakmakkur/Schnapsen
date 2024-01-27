import { useRef, useState } from "react";
import ConfigsContainer from "./1-Containers/ConfigsContainer";
import MainPlayContainer from "./1-Containers/MainPlayContainer";
import SettingsContainer from "./1-Containers/SettingsContainer";
import Panel from "./1-Containers/Panel";
import ScoreboardContainer from "./1-Containers/ScoreboardContainer";

import { PointsContextProvider } from "./GlobalVariables/PointsContext";

export default function App() {
  const mainPlayContainerRef = useRef();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <PointsContextProvider>
      <div className="mainDiv">
        <MainPlayContainer ref={mainPlayContainerRef} />
        <Panel>
          {showSettings ? (
            <SettingsContainer setShowSettings={setShowSettings} />
          ) : (
            <>
              <ScoreboardContainer />
              <ConfigsContainer
                setShowSettings={setShowSettings}
                mainPlayContainerRef={mainPlayContainerRef}
              />
            </>
          )}
        </Panel>
      </div>
    </PointsContextProvider>
  );
}
