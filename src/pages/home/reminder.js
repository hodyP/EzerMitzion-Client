import React, { useState, useEffect } from "react";

const consumedTypes = [
    { id: 1, familyName: "Alice", volunteerName: "Bob" },
    { id: 2, familyName: "Charlie", volunteerName: "David" },
    { id: 3, familyName: "Eve", volunteerName: "Frank" },
];

function Reminder() {

    const [needyReq, setNeedyReq] = useState([]);

    useEffect(() => {
        setNeedyReq(consumedTypes);
    }, []);

    function handleRemove(id) {
        setNeedyReq((prevState) => prevState.filter((item) => item.id !== id));
    }

    return (
        <>      
            {needyReq.map((item) => (
                <NeedyReqItem key={item.id} item={item} onRemove={handleRemove} />
            ))}
        </>
    );
}


function NeedyReqItem({ item, onRemove }) {
    return (
        < >
            <div >
           תזכורת להתקשר למשפחת  {item.familyName}
            </div>
            <button onClick={() => onRemove(item.id)}>Confirm</button>
        </>
    );
}

export default Reminder;
