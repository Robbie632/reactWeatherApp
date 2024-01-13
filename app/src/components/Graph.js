import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Graph(props) {

  const { graphHeight, graphWidth, graphMargins, yLabel, data, dataName, domain } = props;
  return (
    <div className="tile graph-tile" id="wind-graph">
    <ResponsiveContainer width={graphWidth} height={graphHeight}>
      <LineChart
        margin={graphMargins}
        data={data}
      >
        <XAxis dataKey="name" />
          <YAxis
            domain={ domain }
          label={{
            value: yLabel,
            angle: -90,
            position: "insideBottomLeft",
          }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={dataName} stroke="#3B67EB" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )
}

export default Graph;