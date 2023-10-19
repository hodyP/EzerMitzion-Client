import React, { useState } from 'react';

function SelectOption(
    { id, label, options, selectedOption, setSelectedOption }) {
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);  
  };

  return (
    <>
      <label htmlFor={id}>{label}:</label> 
            <input type="text"  placeholder={`Select ${label}`} value={selectedOption} list={id}
            onChange={(e) => setSelectedOption(e.target.value)} onClick={() => setSelectedOption("")} />
            <datalist id={id}>
              {options.map((option) => (
                <option key={option} onClick={() => handleOptionClick(option)}>
                  {option}
                </option>))}    
            </datalist>          
    </>
  );}
export default  SelectOption
  