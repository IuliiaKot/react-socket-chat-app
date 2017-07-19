import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const Rooms = (props) => {
    return (
        <ListGroup>
          <ListGroupItem active tag="a" href="#" action>General</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>NYC</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>SF</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Seattle</ListGroupItem>
        </ListGroup>
    )
}

export default Rooms;