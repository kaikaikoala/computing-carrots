import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import DisplayProfile from './Component/DisplayProfile';
import CreateProfile from './Component/CreateProfile';
import User from './fake-news/koala-kai-profile';
import * as firebaseInterface from './firebaseInterface.js';

class Profile extends Component{

  componentDidMount() {
    let thisRef = this;
    firebaseInterface.getProfileData().then(function(doc) {
      if (doc.exists) {
        const profile = doc.data();
        const firstName = profile.first;
        console.log(firstName);
        const lastName = profile.last;
        console.log(lastName);
        const emailAddress = profile.email;
        console.log(emailAddress);
  
        thisRef.setState({ 
          first: firstName,
          last: lastName,
          email: emailAddress
        });
        
        // this.forceUpdate();
      }
    })
    .catch(function(error) {
        console.log("Error getting profile:", error);
    });
  }

  constructor(props){
    super(props);

    this.state={ 
      first: "",
      last: "",
      email: "",
    };
  }

  edit(first,last,email){
    this.setState({ 
      first: first,
      last: last,
      email: email
    });

    firebaseInterface.saveProfileData(first, last, email);
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
