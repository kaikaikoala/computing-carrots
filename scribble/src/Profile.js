import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import DisplayProfile from './Component/DisplayProfile';
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

  edit(first,last,email){
    this.setState({ 
      first: first,
      last: last,
      email: email
    });
  }

  render(){
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <DisplayProfile
        first = {this.state.first}
        last = {this.state.last}
        email = {this.state.email}
      />
      <CreateProfile
        first ={this.state.first}
        last={this.state.last}
        email={this.state.email}
        edit={(first,last,edit)=>this.edit(first,last,edit)}
      />
      </div>
    );
  }
}
export default Profile;
