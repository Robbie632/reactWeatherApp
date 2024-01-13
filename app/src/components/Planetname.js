export function PlanetName({ mapRadius, x, y, color, planetName }) {
  const height = 40;
  const width = 100;

  return (
    <div
      className="planet"
      style={{
        height: height,
        width: width,
        backgroundColor: color,
        borderRadius: 8,
        zIndex: 1,
        bottom: mapRadius - height / 2 + x,
        left: mapRadius - width / 2 + y,
        opacity: 0.8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>{planetName}</div>
    </div>
  );
}