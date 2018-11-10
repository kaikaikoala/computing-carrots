import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import CreateProfile from './Component/CreateProfile';

class Profile extends Component{
  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <CreateProfile></CreateProfile>
      </div>
    );
  }
}
export default Profile;
