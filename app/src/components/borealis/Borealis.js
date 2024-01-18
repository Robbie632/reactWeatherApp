import "../../style/borealis.css";
import { CloudCover } from "./CloudCover";
import { MoonGraph } from "./MoonGraph";
import { KpGraph } from "./KpGraph";
import { KpMap } from "./KpMap";
import { LocationName } from "./LocationName";

export function Borealis() {
  const tileColor = "#BFE3FF";
  const lat = 51.454514;
  const long = -2.58791;
  const latEskilstuna = 59.370571;
  const longEskilstuna = 16.513590;


  return (
    <div id="first-container">
      <div className="container-0">
        <div className="column borealis">
          <LocationName name="Bristol" color={tileColor} />
          <CloudCover color={tileColor} latitude={lat} longitude={long} />
          <MoonGraph color={tileColor} latitude={lat} longitude={long}/>
        </div>
        <div className="column borealis">
          <KpMap />
          <KpGraph color={tileColor} />
        </div>
        <div className="column borealis">
          <LocationName name="Eskilstuna" color={tileColor} />
          <CloudCover color={tileColor} latitude={latEskilstuna} longitude={longEskilstuna} />
          <MoonGraph color={tileColor} latitude={latEskilstuna} longitude={longEskilstuna}/>
        </div>
      </div>
    </div>
  );
}

