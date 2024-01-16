/**
 * 
 * @param {returns color for tile based on value and thresholds} thresholds 
 * @param {*} value 
 * @param {*} value 
 * @returns 
 */
export function getTileColor(thresholds, value) {
  var selectedColor = "";
  thresholds.forEach(({ lower, upper, color }) => {
    if (value >= lower && value < upper) {
      selectedColor = color;
    }
    return;
  });
  return selectedColor;
  if (selectedColor == "") {
    throw (`${value} not within threshold`);
  } 
}
