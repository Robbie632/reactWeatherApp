import "../../style/borealis.css";
import { CloudCover } from "./CloudCover";
import { MoonGraph } from "./MoonGraph";
import { KpGraph } from "./KpGraph";
import { KpMap } from "./KpMap";
import { LocationName } from "./LocationName";
import { Description } from "./Description";

export function Borealis() {
  const tileColor = "#BFE3FF";
  const descriptionColor = "#CDC9FF";

  const descriptionText =
    "The Kp index (0-9) measures geomagnetic activity, higher values mean more southernly northern lights ";

  return (
    <div id="first-container">
      <div className="container-0">
        <div className="column borealis">
          <LocationName name="Bristol" color={tileColor} />
          <CloudCover color={tileColor} />
          <MoonGraph color={tileColor} />
        </div>
        <div className="column borealis">
          <KpMap />
          <KpGraph color={tileColor} />
          {/* <Description text={descriptionText} color={descriptionColor} /> */}
        </div>
        <div className="column borealis">
          <LocationName name="Eskilstuna" color={tileColor} />
          <CloudCover color={tileColor} />
          <MoonGraph color={tileColor} />
        </div>
      </div>
    </div>
  );
}
// 3 columns
// left column Bristol
// right column sweden
//middle column northern hemisphere map, description ie what kp stats are, why moon etc
// left and right columns should be same component <borealisStats> with params ie title, lat, long
//borealisStats graph showing kp values over last month and moon cycles
// graph showing kp stats over last day
// information on latest sightings?
// cloud coverage
// daylight
