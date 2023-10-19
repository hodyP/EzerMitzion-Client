//import { Button } from 'bootstrap';
import React from 'react'
import { useState, useEffect } from "react"
import ShowDetails from './ShowDetails';
import EditDetails from './EditDetails';


const VolunteerDetails = () => {
    const [details, setDetails] = useState({});
    const [editing, setEditing] = useState(false);

    const cancel=()=>{
        setDetails(prevdetails=>prevdetails);
        setEditing(false);
    }
    useEffect(() => {
        const a = {
            name: "lea",
            family: "atoon",
            address: "reches",
            phone: "129875"
        }
        setDetails(a);
    }, []);

    return (
        <>   
        {editing?<EditDetails details={details} setDetails={setDetails} setEditing={setEditing} cancel={cancel}></EditDetails>:<ShowDetails family={details}></ShowDetails>}                
        <br/>
        {editing?<></>:<button onClick={()=>{setEditing(true)}}>ערוך פרטים</button>}  
        </>
    )
}
export default VolunteerDetails