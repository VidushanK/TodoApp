import React from 'react';
import ViewTasks from './ViewTasks.jsx';

class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      content: ''
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('todoApp/tasks');
    this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });

      this.setState({
        items: items
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
      <ViewTasks items={ this.state.items } />
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input onChange={ this.onContent.bind(this) } value={ this.state.content } />
          <button>Add Tasks</button>
        </form>
      </div>
    );
  }
}
export default Tasks
