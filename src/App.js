import React, { Component } from 'react';
import './assets/styles/App.scss';
import Tasks from './components/Tasks.jsx';
import Users from './components/Users.jsx'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>To-Do List!</h2>
        </div>
        <div className="Users">
          <Users/>
        </div>
        <div className="Tasks">
          <Tasks/>
        </div>
      </div>
    );
  }
}

export default App;
