import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../component/dataGrid';
import { Dialog ,TextField} from '@mui/material';
import CreateNeedy from '../../component/createFamily';
import CreateVolunteer from '../../component/createVolunteer';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

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

export default function Alphone() {
  console.log("Alphone component is rendering");
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [ShowNeedy, setShowNeedy] = React.useState(true);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [openNeedy, setOpenNeedy] = React.useState(false);
  const [openVolunteer, setOpenVolunteer] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [key, setKey] = React.useState(0); 
//AlertDialogSlide

  const handleSetRowSelectionModel = (newRow) => {
    console.log(newRow)
    setRowSelectionModel(newRow);
  }

  const deleteNeddy = async () => {
    try {
      const response = await fetch('http://localhost:3600/api/Needy', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ arr: rowSelectionModel }), 
      });
  
      if (!response.ok) {
        throw new Error('Error deleting items: ' + response.statusText);
      
      }else(setKey(prevKey => prevKey + 1))
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    };

    

    const deleteVolunteer = async () => {
      try {
        const response = await fetch('http://localhost:3600/api/Volunteer', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ arr: rowSelectionModel }), 
        });
    
        if (!response.ok) {
          throw new Error('Error deleting items: ' + response.statusText);
        }
        else(setKey(prevKey => prevKey + 1))
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
      };
 
  const deleteRow = () => { 
      if(ShowNeedy)
        deleteNeddy()
      else deleteVolunteer();
  };

  const handleNavigate = () => {
    console.log(rowSelectionModel);
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
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
      if (newValue === 0) {     
        setShowNeedy(true);
      } else {        
        setShowNeedy(false);
      }
    }
  };
  const handlenavigateVolunteer = () => {
    setOpenVolunteer(true);
    
  }
  const handlenavigateFamily = () => {
    setOpenNeedy(true);
   
  }
   const  handleDoubleNavigate = (event,params) => {
    setButtonClicked(true);
    event.stopPropagation();
    let a = [params.row.id];
    setRowSelectionModel(a);
    
  }

  React.useEffect(() => {
    if ( buttonClicked) {
      handleNavigate();
      setButtonClicked(false); 
    }
  }, [rowSelectionModel]);

  const handleClose = () => {
    setOpenNeedy(false);
    console.log("tbh hear")
  };

  const handleClose2 = () => {
    setOpenVolunteer(false);
  };

  return (
    <Box key={key}
    sx={{ width: '100%' ,minHeight: '100vh',p:3}} 
    >
      <Box 
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        width="100%">
          <Box display="flex" gap={1}>
      {(ShowNeedy) ? (
        <> <Button variant="outlined" startIcon={<AddIcon />} onClick={handlenavigateFamily}>
          הוספת משפחה
        </Button>
          {(rowSelectionModel.length ===1) ? 
          <Button variant="outlined" 
          onClick={handleNavigate}
          sx={{ visibility: rowSelectionModel.length === 1 ? 'visible' : 'hidden' }}
          >לדף משפחה</Button> : null}
        </>) : (
        <>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handlenavigateVolunteer}>
            הוספת מתנדבת
          </Button>
          {(rowSelectionModel.length ===1) ?
            <Button variant="outlined" 
            sx={{ visibility: rowSelectionModel.length === 1 ? 'visible' : 'hidden' }}
            onClick={handleNavigate}>לדף מתנדבת</Button>
            : null
          }
        </>)}
        </Box>
        <Box display="flex" gap={1}>
      <Paper   
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',
         width: 400,borderRadius: 4, backgroundColor: '#f0f0f0', 
        boxShadow: 'none',  }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1,  backgroundColor: 'inherit',  boxShadow: 'none',  
        }}
        placeholder="Search"   
        onChange={(e) => setSearchTerm(e.target.value)}
        dir='rtl'
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>  
    </Paper> 
      <Tabs dir="rtl" value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="משפחות" href="/Needies" />
        <LinkTab label="מתנדבות" href="/Volunteers" />
      </Tabs>
      </Box>
      </Box>
      
      {(ShowNeedy) ? (
        <DataTable dir="rtl" url={'http://localhost:3600/api/needy'} 
        handleSetRowSelectionModel={handleSetRowSelectionModel} 
        handleRowDoubleClick={handleDoubleNavigate} SearchTerm={searchTerm}
        deleteRow={deleteRow}/>
      ) : (
        <DataTable dir="rtl" url={'http://localhost:3600/api/volunteer'} 
        handleSetRowSelectionModel={handleSetRowSelectionModel} 
        handleRowDoubleClick={handleDoubleNavigate} SearchTerm={searchTerm}
        deleteRow={deleteRow}/>
      )}
      <Dialog key="dialog1" open={openNeedy} onClose={handleClose}><CreateNeedy onClose={handleClose}></CreateNeedy> </Dialog>
      <Dialog key="dialog2" open={openVolunteer} onClose={handleClose2}><CreateVolunteer onClose={handleClose2}></CreateVolunteer> </Dialog>
    </Box>
  );
}
