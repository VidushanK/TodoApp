import React from 'react';
import ViewTasks from './ViewTasks.jsx';

class Tasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      key: 'bob',
      items: [],
      content: '',
      completed: false
    }
  }

  componentWillMount(users) {
    this.firebaseRef = firebase.database().ref().child(`todoApp/users/${users}/tasks`);
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
            console.log(firebase.database().ref(`todoApp/users`));
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
  completed(event) {
        event.preventDefault();

        this.props.toggle(this.props.todo);
    }

  render() {
    return (
      <div className="commentForm vert-offset-top-2">
      <h1 className="task-header"> Tasks! </h1>
      <ViewTasks items={ this.state.items }  />
        <form className="todoForm form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
          <div className="col-md-10">
          <input className="form-control" placeholder="What do you need to do?" onChange={ this.onContent.bind(this) } value={ this.state.content } />
          </div>
            <button className="btn btn-primary" >Add Tasks</button>
        </form>
      </div>
    );
  }
}
export default Tasks
