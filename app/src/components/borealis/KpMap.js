export function KpMap({ height = 100, width = 100 }) {

  return (
    <div style={{
      flex: 1,
      width: "100%",
      backgroundColor: "black",
    }}>
      <img src={"https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"}
        width="100%" objectFit="contain"></img>
    </div>
  );
}
