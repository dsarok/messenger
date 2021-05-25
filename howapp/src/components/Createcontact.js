import React ,{useRef}from 'react'
import { Modal,Form, Button } from "react-bootstrap";
import { useContact } from "./Contactcontext";


export default function Createcontact(props) {
  const {createContact}=useContact();
  const name = useRef();
  const id=useRef();
  function handlesubmit(e) {
      e.preventDefault();
     createContact(id.current.value,name.current.value);
     props.Open(false);
  }
    return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Create Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group >
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter ID" ref={id}/>
            </Form.Group>
            <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" ref={name}/>
            </Form.Group>
            <Button className="mr-3" onClick={handlesubmit}>Save</Button>
            <Button variant="danger" onClick={()=>props.Open(false)}>Cancel</Button>
        </Form>
        </Modal.Body>
        </>
    )
}
