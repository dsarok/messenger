import React,{useContext} from 'react'
import  useLocalStorage from "./Uselocalstorage";

const Contactscontext=React.createContext();

export function useContact() {
    return useContext(Contactscontext);
}
export  function Contactcontext({children}) {
    const [contacts, setcontact] = useLocalStorage('contacts', []);
    
    function createContact(id,name) {
        
        setcontact((prev)=>{
            return [...prev, {id,name}];
        })
    }
    return (
        <Contactscontext.Provider value={{contacts,createContact}}>
            {children}
        </Contactscontext.Provider>    
        )
}
