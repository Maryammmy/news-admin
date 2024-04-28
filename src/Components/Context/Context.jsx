import { createContext, useState } from "react";

  export let storecontext= createContext(0)
  export default function Context({children}){
 
    const[selected,setSelected] =useState({})
  

    return <storecontext.Provider value={{selected,setSelected}}>
         {children}
    </storecontext.Provider>
 }