export function LocationName({ name, color }) {
  return (
    <div
      style={{
        flex: 1 / 4,
        width: "100%",
        backgroundColor: color,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "1.8em"}}>{name}</div>
    </div>
  );
}
