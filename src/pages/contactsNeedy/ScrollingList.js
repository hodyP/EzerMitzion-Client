import React from 'react';

const ScrollingList = ({ items }) => {
  return (
    <select>
      {items.map(item => (
        <option onChange={(e)=>{console.log(e.target.value)}} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default ScrollingList;