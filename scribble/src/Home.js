import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import Login from './Component/Login';
import { withStyles } from '@material-ui/core/styles';
import background from './static/meeting.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
});

class Home extends Component{
  render(){

    return(
      <div className={this.props.classes.root} >
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <Login/>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
