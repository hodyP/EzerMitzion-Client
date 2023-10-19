import React from 'react'
import ContactsNeedy from './ContactsNeedy'
import {useState} from "react"
import Search from './Search'
import ScrollingList from './ScrollingList'

const PageContactsNeedy = () => {
    const [find,setFind]=useState("");
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <>
    <Search setFind={setFind}></Search>
    <br/>
    <ScrollingList items={items}></ScrollingList>
    <ContactsNeedy find={find}  ></ContactsNeedy>
    </>
  )
}

export default PageContactsNeedy