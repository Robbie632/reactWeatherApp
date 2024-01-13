
import { IconContext } from "react-icons";

function Tile({ icon, iconSize="4em", value, unit }) {

  return (
    <div className="current-tile tile" id="current-temp">
    <IconContext.Provider
      value={{
          size: iconSize,
        color: "#3B67EB",
        className: "global-class-name",
      }}
    >
      { icon }
    </IconContext.Provider>
    <br></br>
    <div>
        {value} {unit}
    </div>
  </div>
  )

}

export default Tile;