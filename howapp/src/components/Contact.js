import React from 'react'
import { ListGroup } from "react-bootstrap";
import { useContact } from "./Contactcontext";
function Contact() {
    const {contacts}=useContact();
    return (
        <ListGroup variant="flush">
            {contacts.map(val=>(
           <ListGroup.Item key={val.id}>{val.name}</ListGroup.Item>
        ))}
        </ListGroup>
        
    )
}

export default Contact
