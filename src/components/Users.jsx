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
        var user = childSnapshot.val();
        user['.key'] = childSnapshot.key;
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

  render() {
    return (
      <div>
      <ViewUsers users={ this.state.users } />
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input onChange={ this.onContent.bind(this) } value={ this.state.content } />
          <button>Add Users</button>
        </form>
      </div>
    );
  }
}
export default Users
