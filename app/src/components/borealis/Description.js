import { IoInformationCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
export function Description({ text, color = "white" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flex: 1,
        borderRadius: "20px",
        backgroundColor: color,
      }}
    >
      <div style={{ flex: "1/4", marginTop:"10px"}}>
        <IconContext.Provider
          value={{
            size: "3em",
            color: "#3B67EB",
          }}
        >
          <IoInformationCircleOutline />
        </IconContext.Provider>
      </div>
      <div
        style={{
          flex: 1,
          fontFamily: "arial",
          fontSize: "1.2em",
          textAlign: "left",
          marginLeft: "30px",
          marginRight: "30px",
        }}
      >
        {text}
      </div>
    </div>
  );
}
