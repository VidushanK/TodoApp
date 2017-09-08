import React from 'react';
import '../assets/styles/tasks.scss';

class viewUsers extends React.Component {
  render() {
    var _this = this;
    var createUser = function(user, index) {
      return (
        <li key={ index }>
          { user.content }
          <button className="btn btn-danger pull-right" onClick={ _this.props.removeUser.bind(null, user['.key']) }>X </button>
        </li>
      );
    };
    return <ul className="sidebar-nav">{ this.props.users.map(createUser) }</ul>;
  }
}
export default viewUsers
