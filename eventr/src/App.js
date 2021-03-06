import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import ItemRegistry from './itemRegistry';


import { MenuHeader } from './Menubar.js'

class App extends Component {
  state = {users:[]}

  componentDidMount(){
    // fetch('/users')
    fetch('/get_tables_data/users/user_id')
      .then(res=> res.json())
      .then(users => this.setState({users}));
  }
  render() {
    return (
      <div className="App">
        <MenuHeader />
        <h1>Users Table example info</h1>
        {this.state.users.map(user =>
          <div key={user.user_id}>
              <ul>
                <li>{user.fname} {user.lname}</li>
                <li>Picture {user.picture}</li>
                <li>Email: {user.email}</li>
                <li>Join-date: {user.join_date}</li>
                <li>Telephone: {user.phone}</li>
                <li>Location: {user.location}</li>
                <li>User Name: {user.user_name}</li>
               </ul>
            </div>
        )}
      </div>
    );
  }
}

export default App;
