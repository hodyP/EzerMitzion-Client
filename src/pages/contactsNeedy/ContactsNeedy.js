import React from 'react'
import NeedyShort from './needyShort';
import { useState,useEffect } from "react"
import axios from "axios"


var needies = [
    {
        firstName: "yehudit",
        lastName: "dafan",
        phone: "0583214388",
        mail: "gfd@gmail.com",
        city: "Jerusalem",
        neighborhood: "ramat eshcol",
        street: "mevo chazerot"
    },
    {
        firstName: "yaeli",
        lastName: "gamli",
        phone: "077551214",
        mail: "gfd@gmail.com",
        city: "Jerusalem",
        neighborhood: "reches",
        street: "alnakwa"
    },
    {
        firstName: "yaeli",
        lastName: "gamli",
        phone: "077551214",
        mail: "gfd@gmail.com",
        city: "Jerusalem",
        neighborhood: "reches",
        street: "alnakwa"
    }
];

const ContactsNeedy = (props) => {
    const [needyList, setNeedyList] = useState(needies);
    // useEffect(() => {

    //     async function fetchData() {
    //         const {data:_needies} = await axios.get("http://localhost:3600/api/needy")
    //         if(_needies?.length) setNeedyList(_needies)
           
    //       }
    //       fetchData()
    //   }, []);

    return (
        <>
            <table className="table">
                <NeedyShort firstName="שם פרטי"
                    lastName="שם משפחה" phone="מס פלאפון" mail="מייל"
                    city="עיר" neighborhood="שכונה" street="רחוב">
                </NeedyShort>

                {needyList.map(x=>x.lastName.startsWith(props.find)?
                <NeedyShort 
                firstName={x.firstName}
                lastName={x.lastName} phone={x.phone} mail={x.mail}
                city={x.city} neighborhood={x.neighborhood} street={x.street}></NeedyShort>
                :<></>
                )}
        </table>
        </>
    )
}

export default ContactsNeedy
