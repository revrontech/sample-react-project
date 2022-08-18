import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { injectIntl, intlShape } from 'react-intl';
import 'enl-styles/vendors/rechart/styles.css';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { dataPerformance } from 'enl-api/chart/chartData';
import colorfull from 'enl-api/palette/colorfull';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

const color = ({
  main: colorfull[2],
  secondary: '#CCC',
  third: colorfull[0],
  fourth: colorfull[1],
});

function PerformanceChartWidget(props) {
  const { classes } = props;
  return (
    <Grid container spacing={2}>
      <Grid item md={7} xs={12}>
        <PapperBlock whiteBg noMargin title="Up / Down Bandwidth" icon="timeline" desc="">
          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={800}>
                <ComposedChart
                  data={dataPerformance}
                >
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="basis" stackId="2" dataKey="Task" stroke="none" fill={color.secondary} />
                  <Line type="monotone" dataKey="Complaint" strokeWidth={2} stroke={color.third} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </PapperBlock>
      </Grid>
      <Grid item md={5} xs={12}>
        <PapperBlock whiteBg noMargin title="Reports" icon="" desc="">
          <Divider className={classes.divider} />
          <div style={{ height: 300 }}>
            <ul className={classes.secondaryWrap}>
              <li>
                <Typography gutterBottom>Daily active mags</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.pinkProgress)} value={24} />
              </li>
              <li>
                <Typography gutterBottom>Weekly active mags</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.purpleProgress)} value={89} />
              </li>
              <li>
                <Typography gutterBottom>Monthly active mags</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.orangeProgress)} value={78} />
              </li>
              <li>
                <Typography gutterBottom>Yearly active mags</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.greenProgress)} value={55} />
              </li>
            </ul>
          </div>
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

PerformanceChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(PerformanceChartWidget));
