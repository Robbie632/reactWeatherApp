import { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

class LineGraph extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { yLabel, xLabel, height, width, data } = this.props;
    return (
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="rain" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineGraph;
