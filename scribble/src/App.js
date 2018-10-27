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

  eventAdd(){
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
            <Contacts contactsList={this.state.contactsList}/> 
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
