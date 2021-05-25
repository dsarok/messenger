import  React,{useState} from "react";
import { Button, Tab, Tabs,Modal} from "react-bootstrap";
import  Createcontact from "./Createcontact";
import  Createmessage from "./Createmessage";
import  Conversation from "./Conversation";
import Contact from "./Contact";
export default function Sidebar(props) {
  const [key, setKey] = useState('Conversation');
  const [modelopen, setModelopen] = useState(false)
return (
     <>
          <div className="w-25">
          <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className = " d-flex" 
         >
      <Tab eventKey="Conversation" title="Conversation"
        className = " border-right overflow-auto flex-grow-1" style={{height:"84vh"}} >
      <Conversation/>
      </Tab>
      <Tab eventKey="Contact" title="Contact"
        className = "border-right overflow-auto flex-grow-1" style={{height:"84vh"}}
        >
       <Contact/>
      </Tab>
      </Tabs>
      <div className="border">
          Your Id : <span className="text-muted"> {props.id}</span>
      </div>
      <Button style={{width:"100%", borderRadius:0}} onClick={()=>setModelopen(true)} >
          New {key}
      </Button>
      </div>
        <Modal show={modelopen} onHide={()=>setModelopen(false)}>
        {(key==="Contact")?<Createcontact Open={setModelopen}/>:<Createmessage Open={setModelopen}/>}
        </Modal>
      
      </>
      );
}