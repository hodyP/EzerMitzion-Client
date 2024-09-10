import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../component/dataGrid';

import { useNavigate } from 'react-router-dom';
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
  console.log("Alphone component is rendering");
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [ShowNeedy, setShowNeedy] = React.useState(true);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const handleSetRowSelectionModel = (newRow) => {
    setRowSelectionModel(newRow);
  }

  const handleNavigate = () => {
    if ((rowSelectionModel.length === 1)) {
      if (ShowNeedy) {
        navigate(`/needy/${rowSelectionModel[0]}`);
      } else {
        navigate(`/volunteer/${rowSelectionModel[0]}`);
      }
    }
    else {
      console.error('Select exactly one row to navigate');
    }

  };
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
  const handlenavigateVolunteer = () => {
    navigate('/volunteer/add');
  }
  const handlenavigateFamily = () => {
    navigate('/needy/add');
  }

  return (
    <Box sx={{ width: '100%' }}>
      {(ShowNeedy) ? (
        <> <Button variant="outlined" startIcon={<AddIcon />} onClick={handlenavigateFamily}>
          הוספת משפחה
        </Button>
          {(rowSelectionModel.length ===1) ? <Button variant="outlined" onClick={handleNavigate}>לדף משפחה</Button> : null}
        </>) : (
        <>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handlenavigateVolunteer}>
            הוספת מתנדבת
          </Button>
          {(rowSelectionModel.length ===1) ?
            <Button variant="outlined" onClick={handleNavigate}>לדף מתנדבת</Button>
            : null
          }
        </>)}
      <Tabs dir="rtl" value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="משפחות" href="/Needies" />
        <LinkTab label="מתנדבות" href="/Volunteers" />
      </Tabs>

      {(ShowNeedy) ? (
        <DataTable dir="rtl" url={'http://localhost:3600/api/needy'} handleSetRowSelectionModel={handleSetRowSelectionModel} />
      ) : (
        <DataTable dir="rtl" url={'http://localhost:3600/api/volunteer'} handleSetRowSelectionModel={handleSetRowSelectionModel} />
      )}
    </Box>
  );
}
