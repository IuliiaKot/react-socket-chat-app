import React, {Component} from 'react';

const UsersList = (props) => {
    return (
      <div className="list-group rooms">
          {props.users.map((user, idx) => {
            return (<a href="#" key={idx} className="list-group-item">{user.username}</a>)
          })}
      </div>
    )
}

export default UsersList;
