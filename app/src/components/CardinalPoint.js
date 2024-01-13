export function CardinalPoint({ mapRadius, x, y, name }) {
  const height = 30;
  const width = 30;

  return (
    <div
      className="planet"
      style={{
        height: height,
        width: width,
        backgroundColor: "#7899B3",
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
      <div>{name}</div>
    </div>
  );
}