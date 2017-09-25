import React from 'react';
import ViewUsers from './ViewUsers.jsx';

class Users extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      content: ''
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('todoApp/users');
    this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
      var users = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var user = childSnapshot.val()
        user['.key'] = childSnapshot.key;
        // console.log(user['.key'])
        users.push(user);
      });

      this.setState({
        users: users
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.content !== 0) {
      this.firebaseRef.push({
        content: this.state.content
      });
      this.setState({
        content: ''
      });
    }
  }
  removeUser(key) {
   var firebaseRef = firebase.database().ref('todoApp/users');
   firebaseRef.child(key).remove();
 }

  render() {
    return (
      <div id="sidebar-wrapper">

      <div id="users">
        <h1> Todays Tasks! </h1>
      <ViewUsers className="todoForm form-horizontal" users={ this.state.users } removeUser={ this.removeUser }/>
      </div>
      <div id="user-wrapper">
        <form onSubmit={ this.handleSubmit.bind(this) }>
        <div className="user-input">
        <input onChange={ this.onContent.bind(this) } value={ this.state.content } />
        <button className="btn btn-primary currentbutton">Add Todays Tasks!</button>
        </div>
        </form>
      </div>
      </div>
    );
  }
}
export default Users
