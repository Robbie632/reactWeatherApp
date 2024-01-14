export function PlanetName({ mapRadius, x, y, planetName, opacity }) {
  const height = 40;
  const width = 100;

  return (
    <div
      className="planet"
      style={{
        color: "white",
        zIndex: 1,
        bottom: mapRadius  + x,
        left: mapRadius  + y,
        opacity: 0.8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: opacity,
        border: "none"
      }}
    >
      <div>{planetName}</div>
    </div>
  );
}