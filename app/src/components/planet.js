export function Planet({ mapRadius, planetRadius, x, y, color }) {
  return (
    <div
      className="planet"
      style={{
        height: 2 * planetRadius,
        width: 2 * planetRadius,
        borderRadius: planetRadius,
        backgroundColor: color,
        zIndex: 1,
        bottom: mapRadius - planetRadius + x,
        left: mapRadius - planetRadius + y,
        opacity: 0.8,
      }}
    ></div>
  );
}