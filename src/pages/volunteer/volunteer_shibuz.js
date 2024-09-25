import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import RequestCard from './../needy/request_card';
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog } from '@mui/material';
import AddTimerVolunteer from './addTimerVolunteer';
import TimerVolunteer from './timerVolunteer';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';

function Volunteer_shibuz(props) {
    const [value, setValue] = useState(0);
    const [showRequests, setShowRequests] = useState(true);
    const [volunteerRequests, setVolunteerRequests] = useState([]);
    const [volunteerHistory, setVolunteerHistory] = useState([]);
    const [volunteerTimer, setVolunteerTimer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        fetchVolunteerRequests();
        fetchVolunteerHistory();
        fetchVolunteerTimer();
    }, [key]);

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
                    if (samePageLinkNavigation(event)) {
                        event.preventDefault();
                    }
                }}
                {...props}
            />
        );
    }

    const handleChange = (event, newValue) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
            setShowRequests(newValue === 0);
        }
    };

    const fetchVolunteerRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3600/api/needy_request/volunteer/${props.id}`);
            setVolunteerRequests(response.data);
            setLoading(false);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching needy requests:', error);
            setLoading(false);
        }
    };

    const fetchVolunteerHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:3600/api/needy_request/volunteer/${props.id}/history`);
            setVolunteerHistory(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching needy history:', props.id);
            setLoading(false);
        }
    };

    const fetchVolunteerTimer = async () => {
        try {
            const response = await axios.get(`http://localhost:3600/api/volunteer_timer/volunteer/${props.id}`);
            setVolunteerTimer(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching timer requests:', error);
            setLoading(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        success();
    };

    function success() {
        setKey(prevKey => prevKey + 1);
    }

    return (
        <Box key={key} sx={{ p: 2 }}>
            <Tabs dir="rtl" value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="התנדבויות" href="/requests" />
                <LinkTab label="היסטוריה" href="/Requests" />
                <div style={{ marginLeft: 6, marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" onClick={handleClickOpen} sx={{ m: 1 }}>
                       <PostAddIcon></PostAddIcon>  הוספת זמן התנדבות
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <AddTimerVolunteer
                            success={success}
                            open={open}
                            value={{ idVolunteer: props.id }}
                            onClose={handleClose}
                        />
                    </Dialog>
                </div>
            </Tabs>

            <List
                sx={{
                    width: '85%',
                    margin: '0 auto',
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
                            <>
                                {volunteerRequests.map(needyRequest => (
                                    <RequestCard
                                        needy={props.data}
                                        key={needyRequest.id}
                                        ask="volunteer"
                                        needyRequest={needyRequest}
                                        success={success}
                                    />
                                ))}
                                {volunteerTimer.map(volunteer => (
                                    <TimerVolunteer
                                        key={volunteer.id}
                                        ask="volunteer"
                                        data={volunteer}
                                        success={success}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : (
                            volunteerHistory.map(volunteer => (
                                <RequestCard
                                    needy={props.data}
                                    key={volunteer.id}
                                    ask="volunteer"
                                    needyRequest={volunteer}
                                />
                            ))
                        )}
                    </>
                )}
            </List>
        </Box>
    );
}

export default Volunteer_shibuz;
