import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';

class Profile extends Component{
  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <h1>Profile</h1>
      </div>
    );
  }
}
export default Profile;
