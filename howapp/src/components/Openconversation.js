import React ,{useState,useCallback}from 'react'
import { InputGroup,Form, Button } from 'react-bootstrap';
import { useConversation } from "./Conversationcontext";
import { useContact } from "./Contactcontext";
function Openconversation({id}) {
    const {contacts}=useContact();
    const [text, setText] = useState('');
   
    const {
        selectedconversation,
        sendmessage
    } = useConversation();
    
    function handlesubmit(e) {
        e.preventDefault();
        const idarray=(selectedconversation.reciepent.map(r => (r.id)));
        sendmessage(idarray, text);
        setText('')
    }
    const setref=useCallback(
        (node) => {
            if (node) {
            node.scrollIntoView({smooth:true})  
                }
        },[])
        function namefinder(ID) {
            let name=contacts.find(e=>{
                return e.id===ID
            })
            if (!name) {
                name=ID
            }
            else{
                name=name.name
            }
            return name
        }
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className=" flex-grow-1 overflow-auto">
                <div className="d-flex overflow-auto justify-content-end flex-column-reverse px-3  align-items-start">
                  {selectedconversation.msg.map((e,i)=>{
                      const end=selectedconversation.msg.length-1===i
                      return(
                          <div ref={end?setref:null} className={`px-2 py-1 ${(e.sender===id)?"align-self-end":null} ` } key={i}>
                          <div className={`${(e.sender===id)?"bg-primary text-white align-self-end":"bg-success"} px-2 py-1 rounded`}>
                              {e.text}
                          </div>
                            <div className="text-muted small text-right">
                                {e.sender===id?"You":namefinder(e.sender)}
                          </div>
                          </div>
                        
                      )
                  })} 
                  
                </div>
                
            </div>
            <Form className="m-2">
             <Form.Group>
                 <InputGroup>
                    <Form.Control
                    as="textarea"
                    required
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    style={{height:"75px",resize:'none',borderWidth:3}}
                    />    
                    <InputGroup.Append>
                        <Button type="Submit" onClick={handlesubmit}>
                            send
                        </Button>
                    </InputGroup.Append>
                 </InputGroup>
             </Form.Group>
            </Form>
        </div>
    )
}

export default Openconversation
