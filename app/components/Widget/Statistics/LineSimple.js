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
  ResponsiveContainer
} from 'recharts';
import { datahb } from './sampleData';
import styles from './fluidChart-jss';

function LineSimple(props) {
  const { classes } = props;
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <LineChart
          data={datahb}
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
          <Line type="monotone" dataKey="beat" strokeWidth={5} stroke="#AAA" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="drop" strokeWidth={5} stroke="#FA0000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineSimple.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineSimple);
