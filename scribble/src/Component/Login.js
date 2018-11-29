import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from '../firebase.js';
import * as firebaseInterface from '../firebaseInterface.js';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  register: {
    marginTop: theme.spacing.unit * 3,
  },
  signIn: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input 
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus 
                  value={this.state.name}
                  onChange={this.handleChange('email')}
                  />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.name}
                  onChange={this.handleChange('password')}
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.register}
                onClick={() => {
                  if (firebaseInterface.firebaseRegister(this.state.email, this.state.password) == true) {
                    // route them to their home page
                    window.location = 'Calendar'
                  }
                }}
              >
                Register
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.signIn}
                onClick={() => {
                  // we route to the Calendar within firebaseRegister
                  firebaseInterface.firebaseSignIn(this.state.email, this.state.password)
                    // .then(function(){
                    // });
                    window.location = 'Calendar'
                }}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
