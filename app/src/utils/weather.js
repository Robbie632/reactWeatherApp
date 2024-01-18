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

/**
 * 
 * groups object by dayMonthYear
 */
function groupData(data) {
  data = data.map(({ date, cloudCover }) => {
    const d = new Date(Date.parse(date));
    const day = d.getDay();
    const dayOfMonth = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    return {
      value: cloudCover,
      day: day,
      dayOfMonth: dayOfMonth,
      month: month,
      year: year,
      dayMonthYear: `${dayOfMonth}-${month}-${year}`,
    };
  });
  const groupedData = data.reduce((x, y) => {
    (x[y.dayMonthYear] = x[y.dayMonthYear] || []).push(y);
    return x;
  }, {});

  return groupedData;
}
/**
 * Averages temperature over each day 
 */
function aggregatedata(data) {

  const dataAsArray = [];
  for (const key in data) {
    dataAsArray.push({
      dayMonthYear: key,
      data: data[key],
    });
  }

  const aggregated = dataAsArray.map((v) => {
    const { dayMonthYear } = v;
    const { data } = v;
    const count = data.length;

    const valuesSum = data.reduce((x, y) => {
      return x + y.value;
    }, 0);
    const average = valuesSum / count;

    return {
      dayMonthYear: dayMonthYear,
      average: average,
    };
  });

  return aggregated;
}

module.exports = {
  groupData: groupData,
  getTileColor: getTileColor,
  aggregatedata: aggregatedata,
};
