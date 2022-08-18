import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, intlShape } from 'react-intl';
import { PapperBlock } from 'enl-components';
import styles from './widget-jss';
import {
  LineSimple,
  LineSimpleLMA,
} from './Statistics';

function FilesWidget(props) {
  const { classes } = props;
  return (
    <Grid container spacing={3}>
      <Grid item md={4} sm={12} xs={12}>
        <PapperBlock whiteBg noMargin title="Up / Down Bandwidth" icon="timeline" desc="">
          <div className={classes.secondaryWrap}>
            <div className={classes.centerItem}>
              <Chip label="Difference" className={classes.chip} style={{ color: '#AAA' }} />
              <CircularProgress variant="determinate" className={classes.progressCircle} size={140} thickness={4} value={60} />
            </div>
            <ul className={classes.storageInfo}>
              <li>
                <Typography variant="h6" style={{ color: '#AAA' }} gutterBottom>120</Typography>
                <Typography variant="caption" gutterBottom>
                  Server
                </Typography>
              </li>
              <li>
                <Typography variant="h6" gutterBottom>200</Typography>
                <Typography variant="caption" gutterBottom>
                  Client
                </Typography>
              </li>
            </ul>
          </div>
        </PapperBlock>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <PapperBlock title="Heartbeat Counters" icon="favorite" whiteBg desc="">
          <div>
            <LineSimple />
          </div>
        </PapperBlock>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <PapperBlock title="LMA Statistics" icon="collections" whiteBg desc="">
          <div>
            <LineSimpleLMA />
          </div>
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

FilesWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(FilesWidget));
