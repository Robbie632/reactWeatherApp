export function LocationName({ name, color }) {
  return (
    <div
      style={{
        flex: 1 / 2,
        width: "100%",
        backgroundColor: color,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2em"}}>{name}</div>
    </div>
  );
}
