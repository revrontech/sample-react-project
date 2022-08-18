import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { datalma } from './sampleData';
import styles from './fluidChart-jss';

function LineSimpleLMA(props) {
  const { classes } = props;
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <LineChart
          data={datalma}
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
          <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
          <Line type="monotone" dataKey="cpu" strokeWidth={5} stroke="#FA0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="memory" strokeWidth={5} stroke="#AAA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineSimpleLMA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineSimpleLMA);
