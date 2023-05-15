import HomeNav from "./HomeNav";
import PhaseLabel from "./PhaseLabel";
import TientoHero from "./TientoHero";

function TientoHome({ setIsHovered }: { setIsHovered: (isHovered: boolean) => void }) {
  return (
    <>
      <PhaseLabel setIsHovered={setIsHovered} />
      <HomeNav setIsHovered={setIsHovered} />
      <TientoHero setIsHovered={setIsHovered} />
    </>
  );
}

export default TientoHome;
