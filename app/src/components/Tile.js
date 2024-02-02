
import { IconContext } from "react-icons";

function Tile({ icon, iconSize = "2.2em", value, unit, color = "#BFCFFF" }) {
  
  const style = {
    borderBottom: `10px solid ${color}`
  }

  return (
    <div className="current-tile tile" id="current-temp" style={style}>
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