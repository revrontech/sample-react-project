import React, { PureComponent } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { x: 0, y: 10, z: 200 },
  { x: 1, y: 20, z: 260 },
  { x: 2, y: 70, z: 400 },
  { x: 3, y: 60, z: 280 },
  { x: 4, y: 80, z: 500 },
  { x: 5, y: 100, z: 200 },
];

const data2 = [
  { x: 0, y: 20, z: 200 },
  { x: 1, y: 80, z: 260 },
  { x: 2, y: 55, z: 400 },
  { x: 3, y: 30, z: 280 },
  { x: 4, y: 5, z: 500 },
  { x: 5, y: 45, z: 200 },
];

export default class JitterMap extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    // eslint-disable-next-line no-shadow
    const { data, xKey } = this.props;
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="hr" unit="hr" />
          <YAxis type="number" dataKey="y" name={xKey} unit={xKey} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={data} fill="#6DD400" />

        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
