import React from 'react';
import '../assets/styles/tasks.scss';

class viewUsers extends React.Component {
  render() {
    var _this = this;
    var createUser = function(user, index) {
      return (
        <li key={ index }>
          { user.content }
        </li>
      );
    };
    return <ul className="TaskWrapper">{ this.props.users.map(createUser) }</ul>;
  }
}
export default viewUsers
