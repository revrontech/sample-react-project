import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  CheckboxRedux,
  SelectRedux,
  TextFieldRedux,
  SwitchRedux
} from 'enl-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'enl-redux/actions/reduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
});

const initData = {
  text: 'Sample Text',
  email: 'sample@mail.com',
  radio: 'option1',
  selection: 'option1',
  onof: true,
  checkbox: true,
  textarea: 'This is default text'
};

function ReduxFormDemo(props) {
  const trueBool = true;
  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
    init,
    clear
  } = props;
  return (
    <div>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder="Company Name"
                  label="Company Name"
                  validate={required}
                  required
                  className={classes.field}
                />
              </div>
              <div>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Country</InputLabel>
                  <Field
                    name="selection"
                    component={SelectRedux}
                    autoWidth={trueBool}
                    value="option1"
                    defaultValue="option1"
                  >
                    <MenuItem selected value="option1">United States of America</MenuItem>
                    <MenuItem value="option2">Australia</MenuItem>
                    <MenuItem value="option3">Canada</MenuItem>
                  </Field>
                </FormControl>
              </div>

              <div className={classes.fieldBasic}>
                <div className={classes.inlineWrap}>
                  <FormControlLabel checked control={<Field name="onof" component={SwitchRedux} />} label="Notification" />
                </div>
              </div>
              <div>
                <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                  Update
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

ReduxFormDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(ReduxFormDemo);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
