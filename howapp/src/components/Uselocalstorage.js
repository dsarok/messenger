import { useEffect, useState } from "react";

export default function useLocalStorage(key,initialvalue) {
const prefixed="howapp-clone-"+key;
const [value,setvalue]=useState(()=>{
    const jsonvalue=localStorage.getItem(prefixed);
    if (jsonvalue!=null) {
        return JSON.parse(jsonvalue);
    }
    else{
        return initialvalue;
    }
})
useEffect(() => {
    localStorage.setItem(prefixed,JSON.stringify(value))
    
}, [prefixed,value])
return [value,setvalue];
}