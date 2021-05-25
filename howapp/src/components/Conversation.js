import React from 'react'
import { useConversation } from "./Conversationcontext";
import { ListGroup } from "react-bootstrap";
function Conversation() {
    const {conversations,setSelectedid} = useConversation();
    return (
        <ListGroup variant="flush">
            {conversations.map((val,ind)=>(
           <ListGroup.Item key={ind}
           active={val.selected}
           
           onClick={()=>setSelectedid(ind)}>
           {val.reciepent.map(r=>r.name).join(',')}
           </ListGroup.Item>
        ))}
        </ListGroup>
    )
}

export default Conversation
