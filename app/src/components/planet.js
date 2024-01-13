export function Planet({ mapRadius, planetRadius, x, y, color, opacity }) {
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
        opacity: opacity,
      }}
    ></div>
  );
}