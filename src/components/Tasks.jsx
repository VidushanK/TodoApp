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
    this.firebaseRef = firebase.database().ref('todoApp/users/tasks');
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
      <div className="commentForm vert-offset-top-2">
      <ViewTasks items={ this.state.items } />
        <form className="todoForm form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
          <div className="col-md-10">
          <input className="form-control" placeholder="What do you need to do?" onChange={ this.onContent.bind(this) } value={ this.state.content } />
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-2 text-right">
            <button className="btn btn-primary" >Add Tasks</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Tasks
