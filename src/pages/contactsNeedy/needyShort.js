import React from 'react'
import {useState} from "react"

const NeedyShort = (props) => {

    return (
        <tr>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td>{props.phone}</td>
            <td>{props.mail}</td>
            <td>{props.city}</td>
            <td>{props.neighborhood}</td>
            <td>{props.street}</td>
        </tr>
    )
}

export default NeedyShort