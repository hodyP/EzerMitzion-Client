// import React from 'react'
import { React,useState } from "react"
import Needy from '../../models/needy';

const EditDetails = (props) => {

const [name, setName] = useState(props.details.name);
const [family, setFamily] = useState(props.details.family);

const save=()=>{
        let newDetails=new Needy(name,family);
        props.setEditing(false); 
        props.setDetails(newDetails);   
    }

    return (
        <>
        <span>name</span>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <br/>
        <span>family:</span>
        <input type="text" value={family} onChange={(e)=>{setFamily(e.target.value)}}/>                                      
        <br/>
        <button onClick={save}>אישור</button>
        <button onClick={props.cancel}>ביטול</button>
        </>
    )   
}
export default EditDetails

// //import React, { useState, useContext } from 'react';
// // Create a new context
// const MyContext = React.createContext();

// // Create a provider component that wraps your app
// const MyProvider = ({ children }) => {
//   const [myState, setMyState] = useState('initial value');

//   return (
//     <MyContext.Provider value={{ myState, setMyState }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// // Create a custom hook to access the context
// const useMyContext = () => useContext(MyContext);

// export { MyProvider, useMyContext}




/////////////
