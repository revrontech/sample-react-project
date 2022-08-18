import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Devices from '@material-ui/icons/Devices';
import Timer from '@material-ui/icons/Timer';
import Wifi from '@material-ui/icons/Wifi';
import WifiOff from '@material-ui/icons/WifiOff';
import { injectIntl, intlShape } from 'react-intl';
import CounterWidget from '../Counter/CounterWidget';
import messages from './messages';
import styles from './widget-jss';

function CounterIconWidget(props) {
  const { classes, intl } = props;
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-dark"
            start={0}
            end={237}
            duration={3}
            title={intl.formatMessage(messages.subscribers)}
          >
            <Devices className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-dark"
            start={0}
            end={163}
            duration={3}
            title={intl.formatMessage(messages.total_posts)}
          >
            <Wifi className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={74}
            duration={3}
            title={intl.formatMessage(messages.followers)}
          >
            <WifiOff className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={19}
            duration={3}
            unitAfter=" ms"
            title={intl.formatMessage(messages.total_articles)}
          >
            <Timer className={classes.counterIcon} />
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(CounterIconWidget));
