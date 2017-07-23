import React from 'react';
// import { ListGroup, ListGroupItem } from 'reactstrap';


const Rooms = (props) => {
    return (
       
        <div className="list-group">
        <a href="#" className="list-group-item active">
            General
        </a>
        <a href="#" className="list-group-item">NYC</a>
        <a href="#" className="list-group-item">SF</a>
        <a href="#" className="list-group-item">Seattle</a>
        </div>
    )
}

export default Rooms;