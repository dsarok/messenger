import React,{useContext,useState,useCallback,useEffect} from 'react';
import  useLocalStorage from "./Uselocalstorage";
import { useContact } from "./Contactcontext";
import { useSocket } from "./Socketprovider";
const Conversationcontext=React.createContext();

export function useConversation() {
    return useContext(Conversationcontext);
}
export default function Conversationprovider({children,id}) {
    const socket = useSocket();
    const [conversation, setconversation] = useLocalStorage('conversation', []);
    const {contacts}=useContact();
    const [selectedid, setSelectedid] = useState(0);
    function createConversation(recipents) {
        setconversation((prev)=>{
            return [...prev, {recipents:[...recipents],messages:[]}];
        })
    }
    const addMessagetoconversation=useCallback(
      ({reciepients, sender, text}) => {
          let naming = contacts.find(e => {
              return e.id === sender
          });
          
          naming = naming ? naming.name : sender
          const newmessage = {
              text: text,
              sender: naming
          };
          console.log(reciepients,sender,text,"reciepients","sender","message","it is from addmessage"); //it is from addmessage
          setconversation(prevconversation => {
              console.log("run it also man",prevconversation);
              let madechange = false;

              const newconversation = prevconversation.map(e => {
                  console.log("is is also running",prevconversation);
                  if (arrayEquality(reciepients, e.recipents)) {
                      madechange = true;
                      return {
                          recipents:[...reciepients],
                          messages: [ newmessage,...e.messages]
                      }
                  } else
                      return e;

              })
              

              if (!madechange) {
                  return [...prevconversation, {
                      recipents: reciepients,
                      messages: [newmessage]
                  }]
              } else
                  return newconversation;

          })
      },[setconversation]
    )
    
    function arrayEquality(a,b) {
        if (a.length!==b.length) {
            return false;
        }
        a.sort();
        b.sort();
        return a.every((e,ind)=>{
            return e===b[ind]
        })
    }
    function sendmessage(reciepients,text) {
        console.log('sending message',reciepients,text);
        socket.emit('send-message', {
            recipents:reciepients,
            text:text
        })
        addMessagetoconversation({reciepients, sender:id,text});
    }
    useEffect(() => {
        if(socket==null) return
        console.log("use effect running");
        socket.on('recieve-message',addMessagetoconversation)
        return () => {
            socket.off('recieve-message')
        }
    }, [socket,addMessagetoconversation])
    console.log(conversation, "conversation-full-and-updated");          //conversation
    const newconversation=conversation.map((convers,index)=>{
        const reciepent=convers.recipents.map(val=>{
            const contact=contacts.find(cont=>{
                return val===cont.id;
            })
            const name=(contact && contact.name)||val;
            return{id:val,name}
        })
        const selected=(selectedid===index)
    const fromme=(id===convers.messages.sender)
   return {msg:[...convers.messages],reciepent,selected,fromme};
    })
console.log(newconversation,"this is the new conversation");
    const value={
        conversations:newconversation,
        createConversation,
        setSelectedid,
        selectedconversation:newconversation[selectedid],
        sendmessage
    }

    return (
        <Conversationcontext.Provider value={value}>
            {children}
        </Conversationcontext.Provider>    
        )
}
