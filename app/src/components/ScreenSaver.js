import screensaver from "../assets/screensaver.jpg";
import "../style/screensaver.css";

function ScreenSaver() {
  return (
    <div id="picture-frame">
      <img src={screensaver}></img>
    </div>
  );
}

export default ScreenSaver;
