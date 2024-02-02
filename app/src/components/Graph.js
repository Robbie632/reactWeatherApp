import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Graph(props) {

  const { title, graphHeight, graphWidth, graphMargins, yLabel, data, dataName, domain, color ="#BFCFFF"} = props;
  return (
    <div className="tile" id="wind-graph" style={{ backgroundColor: color }}>
      <a style={{fontSize:"1.4em"}}>{title}</a>
    <ResponsiveContainer width={graphWidth} height={graphHeight}>
      <LineChart
        margin={graphMargins}
        data={data}
      >
        <XAxis dataKey="name" />
          <YAxis
            domain={ domain }
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={dataName} stroke="#3B67EB" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )
}

export default Graph;