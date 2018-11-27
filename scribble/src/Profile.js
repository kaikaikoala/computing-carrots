import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import CreateProfile from './Component/CreateProfile';
import User from './fake-news/koala-kai-profile';

class Profile extends Component{

  constructor(props){
    super(props);
    this.state={ 
      first: User.first,
      last: User.last,
      email: User.email,
    };
  }

  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <CreateProfile
        first = {this.state.first}
        last = {this.state.last}
        email = {this.state.email}
      />
      </div>
    );
  }
}
export default Profile;
