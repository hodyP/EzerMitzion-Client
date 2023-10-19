import React from 'react'
import { useState } from "react"
import './search.css';

const Search = (props) => {

    return (
        <>
            {/* <input type="text" onChange={(e) => { props.setFind(e.target.value) }}></input> */}
            <div className="box">
                <form name="search">
                    <input type="text" className="input" name="txt" onMouseOut="this.value = ''; this.blur();" 
                    onChange={(e) => { props.setFind(e.target.value) }} />
                </form>
                <i className="fas fa-search"></i>
            </div>
            <a href="https://www.youtube.com/c/ShortCode" target="_blank" id="ytb">
                <i className="fab fa-youtube"> </i>
            </a>
        </>
    )
}

export default Search