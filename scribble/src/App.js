import React, { Component } from 'react';
import Home from './Home';
import Calendar from './Calendar';
import Contacts from './Contacts';
import Add from './Add';
import User from './fake-news/koala-kai-profile';

import{
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state=User
  }

  ///////////////////////////////////
  //Christian
  ////////////////////////////////
  //The following functions need to be able to update
  //a users account on the server.
  //I have outlined a few ideas for the way we hold data
  //on the team drive.
  /////////////////////////////////////
  //Currently the only function with a front end to support
  //it. Is contactAdd.
  //you can route to it on the contact link in the navbar
  //////////////////////////////
  //if you want to pass functions down yourself you can use this code
  /*
        <Route 
          path="/Contacts"  
          render={(props)=>
            <Contacts addClick={()=>this.contactAdd() } contactsList={this.state.contactsList}/> 
          }
        />
        */
  contactAdd(){
    const events = this.state.events ;
    alert( 'hi' );
    this.setState(); //concatenate new event to old list
  }
  contactDelete(){
    const events = this.state.events ;
    alert( 'hi' );
    this.setState(); //concatenate new event to old list
  }
  eventAdd(){
    const events = this.state.events ;
    alert( 'hi' );
    this.setState(); //concatenate new event to old list
  }
  eventDelete(){
    const events = this.state.events ;
    alert( 'hi' );
    this.setState(); //concatenate new event to old list
  }

  render() {
    return (
      <Router>
      <div>
        <Route path="/" exact={true} component={Home}/>
        <Route 
          path="/Contacts"  
          render={(props)=>
            <Contacts addClick={()=>this.contactAdd() } contactsList={this.state.contactsList}/> 
          }
        />
        <Route 
          path="/Calendar"  
          render={(props)=>
            <Calendar eventInvites={this.state.eventInvites} events={this.state.events}/> 
          }
        />
        <Route 
          path="/Add"  
          render={(props)=>
            <Add onClick={()=> this.state.eventAdd() } /> 
          }
        />
      </div>
      </Router>
    );
  }
}

export default App;
