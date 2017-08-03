import React from 'react';
// import { ListGroup, ListGroupItem } from 'reactstrap';

const switchRoom = (e, props) => {
  e.preventDefault()
  props.switchRoom(e.target.text);
}

const Rooms = (props) => {
    return (

    <div className="list-group rooms">
        <a href="#" className="list-group-item active">
            General
        </a>
        <a href="#" className="list-group-item" onClick={(e) => switchRoom(e, props)}>NYC</a>
        <a href="#" className="list-group-item">SF</a>
        <a href="#" className="list-group-item">Node</a>
    </div>
    )
}

export default Rooms;
