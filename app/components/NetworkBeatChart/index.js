import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, CartesianAxis, ResponsiveContainer
} from 'recharts';
const colorList = '0123456789abcdef';
const NetworkBeatChart = ({ data, devices }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart width={300} height={300} data={data}>
      <XAxis dataKey="name" tickLine={false} />
      <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <CartesianAxis vertical={false} />
      <Tooltip />
      {devices.map((s, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={s.ip_address}
          strokeWidth={5}
          stroke={
            ('#' + colorList[parseInt(Math.random() * 15)] + colorList[parseInt(Math.random() * 15)] + colorList[parseInt(Math.random() * 15)] + colorList[parseInt(Math.random() * 15)] + colorList[parseInt(Math.random() * 15)] + colorList[parseInt(Math.random() * 15)])
          }
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default NetworkBeatChart;
