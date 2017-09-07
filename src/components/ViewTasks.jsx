import React from 'react';
import '../assets/styles/tasks.scss';

class viewTasks extends React.Component {
  render() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          { item.content }
        </li>
      );
    };
    return <ul className="TaskWrapper">{ this.props.items.map(createItem) }</ul>;
  }
}
export default viewTasks
