import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import RandomNumbersDisplay from "./components/RandomNumbersDisplay";
import Pointer from "./components/Pointer/Pointer";
import DisplayBorders from "./components/DisplayBorders";
import TientoInit from "./components/TientoInit";
import ScreenOverlay from "./components/ScreenOverlay";
import BackgroundVideoOverlay from "./components/BackgroundVideoOverlay";
import TientoHome from "./components/TientoHome";

const generalBackgroundColor = "rgb(20, 20, 20)";

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${generalBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
`;

function Home() {
  const [showLanding, setShowLanding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    if (showLanding === true) {
      setIsHovered(false);
    }
  }, [showLanding]);

  function handleShowLanding() {
    setShowLanding(true);
  }

  return (
    <div>
      <HomeContainer>
        <ScreenOverlay />

        <DisplayBorders>
          {showLanding ? (
            <TientoHome setIsHovered={setIsHovered} />
          ) : (
            <TientoInit
              handleShowLanding={handleShowLanding}
              setIsHovered={setIsHovered}
            />
          )}
        </DisplayBorders>

        {showLanding && (
          <>
            <RandomNumbersDisplay />
            <BackgroundVideoOverlay />
          </>
        )}
      </HomeContainer>

      <Pointer isHovered={isHovered} />
    </div>
  );
}

export default Home;
