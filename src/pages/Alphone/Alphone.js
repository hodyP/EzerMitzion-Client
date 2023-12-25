import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../component/dataGrid';
import CreateVolunteer from '../../component/createVolunteer'
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

export default function Alphone() {
  const [value, setValue] = React.useState(0);
  const [ShowNeedy, setShowNeedy] = React.useState(true);
  const [showAddVolunteer, setShowAddVolunteer] = React.useState(false);
  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
      if (newValue === 0) {
        // When the "משפחות" tab is selected (index 0), show the content.
        setShowNeedy(true);
      } else {
        // Hide the content when other tabs are selected.
        setShowNeedy(false);
      }
    }
  };
  const handleAddVolunteerClick = () => {
    setShowAddVolunteer(true); 
  };

  return (
    <Box sx={{ width: '100%' }}>

      <h1>אלפון</h1>  <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddVolunteerClick}>
        add Volunteer
      </Button>
{!showAddVolunteer?
     ( <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="משפחות" href="/Needies" />
        <LinkTab label="מתנדבות" href="/Volunteers" />
      </Tabs>): (<CreateVolunteer></CreateVolunteer>)
}
      {(ShowNeedy&&!showAddVolunteer )? (
        <DataTable url={'http://localhost:3600/api/needy'} />
      )  : (
        <DataTable url={'http://localhost:3600/api/volunteer'} />
      )}
    </Box>
  );
}
