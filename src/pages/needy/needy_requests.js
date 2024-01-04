import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import RequestCard from './request_card';
import Typography from '@mui/material/Typography';
import axios from 'axios';
function Needy_requests(props) {
    const [value, setValue] = useState(0);
    const [showRequests, setShowRequests] = useState(true);
    const [needyRequests, setNeedyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchNeedyRequests();
    }

        , [])
    function samePageLinkNavigation(event) {

        if (
            event.defaultPrevented ||
            event.button !== 0 || // ignore everything but left-click
            event.metaKey ||
            event.ctrlKey ||
            event.altKey ||
            event.shiftKey
        ) {
            return false;
        }
        return true;
    }
    function LinkTab(props) {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    // Routing libraries handle this, you can remove the onClick handle when using them.
                    if (samePageLinkNavigation(event)) {
                        event.preventDefault();
                    }
                }}
                {...props}
            />
        );
    }

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
            if (newValue === 0) {
                // When the "משפחות" tab is selected (index 0), show the content.
                setShowRequests(true);
            } else {
                // Hide the content when other tabs are selected.
                setShowRequests(false);
            }
        }
        console.log("showRequests:", showRequests);
    };
    const fetchNeedyRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3600/api/needy_request/needy/${props.id}`);
            console.log(response.data);
            setNeedyRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching needy requests:', error);
            setLoading(false);
        }

    };
    return (
        <>
            <Tabs   dir="rtl" value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="סטטוס שיבוץ" href="/requests" />
                <LinkTab label="היסטוריה" href="/Requests" />
            </Tabs>
            <List
      sx={{
        width: '100%',   
    height: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        '& ul': { padding: 0 },
      }}
      
    >
                {showRequests ? (
                    <>
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : (
                            needyRequests.map(needyRequest => (
                                <RequestCard  key={needyRequest.id} needyRequest={needyRequest}></RequestCard>
                            ))
                        )}
                    </>
                ) : (
                    <Typography>היסטוריה</Typography>
                )}
            </List>
        </>

    )
}

export default Needy_requests