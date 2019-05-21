import React, { Component } from 'react';
import Home from './Home';
import Calendar from './Calendar';
import Contacts from './Contacts';
import Profile from './Profile';
import User from './fake-news/koala-kai-profile';

import{
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state=User
  }


  render() {
    return (
      <Router>
      <div>
        <Route path="/" exact={true} component={Home}/>
        <Route 
          path="/Contacts"  
          render={(props)=>
            <Contacts /> 
          }
        />
        <Route 
          path="/Calendar"  
          render={(props)=>
            <Calendar /> 
          }
        />
        <Route 
          path="/Profile"  
          render={(props)=>
            <Profile /> 
          }
        />
      </div>
      </Router>
    );
  }
}

export default App;
