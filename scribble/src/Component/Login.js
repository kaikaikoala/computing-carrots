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

  firebaseSignIn() {
    var email = this.state.email
    var password = this.state.password

    // Firebase auth is an async function that takes other functions to run when it completes
    // catch() is run when there is an error and then() is run if it completes sucessfully
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function(error) {
              console.log("invalid sign in!")
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              return false
            })
            .then(function(values) {
              // route to some page where we show the user their stuff
              return true; // returning true doesn't really work for some reason
            });
  };
  
  firebaseRegister () {
    var email = this.state.email
    var password = this.state.password

    // Firebase auth is an async function that takes other functions to run when it completes
    // catch() is run when there is an error and then() is run if it completes sucessfully
    // TODO: handle when the user is already registered, do something unique with authenticated user
    firebase.auth()
                  .createUserWithEmailAndPassword(email, password)
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    return false;
                  })
                  .then(function(values) {
                    if (values == false) {
                      console.log("problem!!!")
                      return false
                    }

                    var user = values.user;
                    console.log(user);
                    var userID = user.uid;
                    var formattedEmail = user.email.replace('@','-').replace('.','-');
                    console.log(formattedEmail);
                    console.log(userID);

                    var path = 'userEmailTable/' + formattedEmail;
                    console.log(path);

                    // add new user to the database that stores email:UID key:values
                    var emailUsernameRef = firebase.database().ref(path);
                    emailUsernameRef.transaction(function(currentData) {
                      if (currentData === null) {
                        return {formattedEmail: formattedEmail, userID: userID};
                      } else {
                        console.log('User already exists.');
                        return; // Abort the transaction.
                      }
                    }, function(error, committed) {
                      if (error) {
                        console.log('Transaction failed abnormally!', error);
                      } else if (!committed) {
                        console.log('We aborted the transaction (because it already exists).');
                      }
                    });

                    // route them to their home page
                    return true;
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
                  this.firebaseRegister()
                  // ideally here we would go to a home page if the registration was successful
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
                  this.firebaseSignIn();

                  // ideally here we would go to a home page if the sign in was successful

                  // var databaseRef = firebase.database().ref('events/someUniqueEventID');
                  // databaseRef.on('value', function(snapshot) {
                  //   var value = snapshot.val();
                  //   console.log(value);
                  // });
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
