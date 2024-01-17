/**
 *
 * @param {returns color for tile based on value and thresholds} thresholds
 * @param {*} value
 * @param {*} value
 * @returns
 */
function getTileColor(thresholds, value) {
  var selectedColor = "";
  thresholds.forEach(({ lower, upper, color }) => {
    if (value >= lower && value < upper) {
      selectedColor = color;
    }
    return;
  });
  if (selectedColor == "") {
    throw `${value} not within threshold`;
  }
  return selectedColor;
}

function parseCloudCover(data) {
  // group data into same day using reduce, exampl ehere https://stackoverflow.com/questions/73253207/typeerror-products-groupby-is-not-a-function
  // run reduce on each array of same day to get average
  data = data.map(({date, cloudCover }) => {
    const d = new Date(Date.parse(date));
    const day = d.getDay();
    const dayOfMonth = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    

    return { value: cloudCover, day: day, dayOfMonth:dayOfMonth,  month: month, year: year, dayMonthYear: `${dayOfMonth}-${month}-${year}` };
  });
  const groupedData = data.reduce((x, y) => {
    (x[y.dayMonthYear] = x[y.dayMonthYear] || []).push(y);
    return x;
  }, {});

  return groupedData;
}

module.exports = {
  parseCloudCover: parseCloudCover,
  getTileColor: getTileColor,
};
