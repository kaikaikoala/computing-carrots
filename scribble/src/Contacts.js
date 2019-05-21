import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import ContactCard from './Component/ContactCard';
import CreateEvent from './Component/CreateEvent';
import AddContact from './Component/AddContact';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


class Contacts extends Component{
  //if you want to insert data into something just do <tags>{this.props.userInfo}</tags>
  //this.props.userInfo == contactsList
      //<h3>{this.props.userInfo[0].group}</h3>

  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="baseline"
      >
        <Grid item xs={2}>
          <h1>Contacts</h1>  
        </Grid>
        <Grid item xs={2}>
          <AddContact></AddContact> 
        </Grid>
      </Grid>
      <ContactCard></ContactCard>
      <br />
      <h1>Groups</h1>
      {/* <ContactCard addClick={()=>this.props.addClick()} contacts={this.props.contactsList[0]}/> */}
      </div>
    );
  }
}
export default Contacts;
