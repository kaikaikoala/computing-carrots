import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import ContactCard from './Component/ContactCard';

class Contacts extends Component{
  //if you want to insert data into something just do <tags>{this.props.userInfo}</tags>
  //this.props.userInfo == contactsList
      //<h3>{this.props.userInfo[0].group}</h3>

  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <h1>Contacts</h1>
      <ContactCard contacts={this.props.contactsList[0]}/>
      <h3>{this.props.contactsList[0].group}</h3>
      </div>
    );
  }
}
export default Contacts;
