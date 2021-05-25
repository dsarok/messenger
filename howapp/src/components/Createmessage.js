import React,{useState} from 'react'
import { Button, Form, Modal } from "react-bootstrap";
import { useContact } from "./Contactcontext";
import { useConversation } from "./Conversationcontext";
export default function Createmessage(props) {
const {contacts}=useContact();
const {createConversation}=useConversation();
const [selectedIds, setselectedIds] = useState([]);
console.log(selectedIds);
function changing(id) {
  setselectedIds(prev=>{
    if(prev.includes(id)){
        return prev.filter(total=>(total!==id))
    }
    else
        return [...prev,id];
    })
}
function handlesubmit(e) {
    e.preventDefault();
    createConversation(selectedIds);
    props.Open(false);
}
    return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Select contacts whom to Send</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        {contacts.map(val=>{
        return(<Form.Check 
        key={val.id}
        type='checkbox'
        value={selectedIds.includes(val.id)}
        label={val.name}
        onChange={()=>{changing(val.id)}}
        />)})}
        <Button type="Submit" onClick={handlesubmit}>Submit</Button>
        </Form>
        </Modal.Body>
        </>
    )
}
