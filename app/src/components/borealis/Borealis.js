import "../../style/borealis.css";
import { CloudCover } from "./CloudCover";
import { MoonGraph } from "./MoonGraph";
import { KpGraph } from "./KpGraph";
import { KpMap } from "./KpMap";
import { LocationName } from "./LocationName";

export function Borealis() {
  const tileColor = "#BFE3FF";
  const { REACT_APP_LATITUDE_1 } = process.env;
  const { REACT_APP_LONGITUDE_1 } = process.env;
  const { REACT_APP_LATITUDE_2 } = process.env;
  const { REACT_APP_LONGITUDE_2 } = process.env;

  return (
    <div id="first-container">
      <div className="container-0">
        <div className="column borealis">
          <LocationName name="Bristol" color={tileColor} />
          <CloudCover color={tileColor} latitude={REACT_APP_LATITUDE_1} longitude={REACT_APP_LONGITUDE_1} />
          <MoonGraph color={tileColor} latitude={REACT_APP_LATITUDE_1} longitude={REACT_APP_LONGITUDE_1}/>
        </div>
        <div className="column borealis">
          <KpMap />
          <KpGraph color={tileColor} />
        </div>
        <div className="column borealis">
          <LocationName name="Eskilstuna" color={tileColor} />
          <CloudCover color={tileColor} latitude={REACT_APP_LATITUDE_2} longitude={REACT_APP_LONGITUDE_2} />
          <MoonGraph color={tileColor} latitude={REACT_APP_LATITUDE_2} longitude={REACT_APP_LONGITUDE_2}/>
        </div>
      </div>
    </div>
  );
}

