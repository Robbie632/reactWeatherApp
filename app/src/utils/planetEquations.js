export function degreesToRadians(a) {
  return (Math.PI * a) / 180;
}

// θ : angle in [0, 2π[
export function polarToCartesian(r, θ) {
  return { x: r * Math.cos(θ), y: r * Math.sin(θ) };
}

