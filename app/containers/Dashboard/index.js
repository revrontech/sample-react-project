import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Grid from '@material-ui/core/Grid';
import {
  CounterIconsWidget,
  PerformanceChartWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from 'enl-components';

function Dashboard() {
  const title = brand.name + ' - Dashboard';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CounterIconsWidget />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        <Grid item xs={12}>
          <PerformanceChartWidget />
        </Grid>
      </Grid>
      <FilesWidget />
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <ContactWidget />
        </Grid>
        <Grid item md={6} xs={12}>
          <TimelineWidget />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
