import React,{useContext,useEffect,useState} from 'react';
import io from 'socket.io-client'
const Socketcontext=React.createContext();
export function useSocket() {
    return  useContext(Socketcontext)
}
export default function Socketprovider({id,children}) {
    const [socket, setsocket] = useState();
    useEffect(() => {
       const newSocket=io('http://localhost:5000',
       {
           query:{id}
       })
       setsocket(newSocket);
       return ()=>newSocket.close()
    }, [id])
    return (
       <Socketcontext.Provider value={socket}>
           {children}
       </Socketcontext.Provider>
    )
}
