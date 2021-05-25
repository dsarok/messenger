import React from 'react'
import Sidebar from './Sidebar'
import { useConversation } from "./Conversationcontext";
import  Openconversation from "./Openconversation";
function Dashboard({id}) {
  const {selectedconversation}=useConversation();
  return (
    <div className="d-flex" style={{height:"100vh"}}>
      <Sidebar id={id}/>
      {selectedconversation && <Openconversation id={id}/>}
    </div>
  )
}

export default Dashboard
