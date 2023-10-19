import React from 'react'
import { useState } from "react"

const ShowDetails = ({family}) => {

    return (
        <>
        <span>name:</span>
        <span>{family.name}</span>
        <br/>
        <span>family:</span>
        <span>{family.family}</span>                                  
        </>
    )
}
export default ShowDetails