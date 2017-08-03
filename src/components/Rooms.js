import React from 'react';
// import { ListGroup, ListGroupItem } from 'reactstrap';

const switchRoom = (e, props) => {
  e.preventDefault()
  props.switchRoom(e.target.text);
}

const Rooms = (props) => {
    return (

    <div className="list-group rooms">
        <h5>Rooms</h5>
        {
            props.rooms.map(roomStr => {
                return <a href="#" className={ roomStr === props.currentRoom ? ' list-group-item active' : 'list-group-item'} onClick={(e) => switchRoom(e, props)}>{roomStr}</a>
            })
        }
    </div>
    )
}

export default Rooms;
