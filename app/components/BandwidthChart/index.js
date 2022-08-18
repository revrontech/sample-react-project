import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  CartesianAxis,
  Legend
} from 'recharts';

const data = [
  {
    name: '00 hr',
    hr: 0,
    speedValue: 70,
    speed: 10,
  },
  {
    name: '01 hr',
    hr: 1,
    speedValue: 60,
    speed: 20,
  },
  {
    name: '02 hr',
    hr: 2,
    speedValue: 60,
    speed: 30,
  },
  {
    name: '03 hr',
    hr: 3,
    speedValue: 50,
    speed: 70,
  },
  {
    name: '04 hr',
    hr: 4,
    speedValue: 80,
    speed: 100,
  },
  {
    name: '05 hr',
    hr: 5,
    speedValue: 120,
    speed: 150,
  },
];
const colorList = '0123456789abcdef';

export default function BandwidthChart(props) {
  return (
    <LineChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" tickLine={false} />
      <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <CartesianAxis vertical={false} />
      <Tooltip />
      {props.devices.map((s, index) => (
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
  );
}
