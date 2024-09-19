import * as React from 'react';
import { DataGrid,GridToolbar ,GridToolbarContainer } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Button ,Box} from '@mui/material';
import { IconButton ,Tooltip  } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomToolbar = ({ onDeleteClick, selectedRows }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <GridToolbar />
      <Tooltip title="Delete">
        <IconButton
          onClick={onDeleteClick}
          disabled={selectedRows.length === 0}
          style={{ color: selectedRows.length > 0 ? 'red' : 'grey' }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default function DataTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDeleteClick = () => {
    if (selectedRows.length > 0) {
      props.deleteRow();
    }
  };

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
    props.handleSetRowSelectionModel(newSelection)
  };
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(props.url); 
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (err) {      
        setError(err.response?.data?.message);
        setLoading(false);
      }
    };
    fetchData(); 
  }, [props.url]);

  const filteredRows = data.filter(row => 
    row.first_name.toLowerCase().includes(props.SearchTerm.toLowerCase()) ||
    row.last_name.toLowerCase().includes(props.SearchTerm.toLowerCase())
  );
 
  const columns = [
    { field: 'id', headerName: 'מספר', width: 90 },
    { field: 'first_name', headerName: 'שם פרטי', width: 130 },
    { field: 'last_name', headerName: 'שם משפחה', width: 150 },
    { field: 'phone', headerName: 'טלפון', type: 'phone', width: 130 },
    { field: 'city', headerName: 'עיר', width: 130 },
    { field: 'neighborhood', headerName: 'שכונה', width: 180 },
    {
      field: 'actions',
      headerName: '',
      
      renderCell: (params) => (
        <IconButton
        onClick={(event) => props.handleRowDoubleClick(event,params)}
          variant="contained"
          color="primary"
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
  ];
  

  return (
    <div style={{ height:500,width: '100%', direction: 'rtl' }}>
        {loading ? (
        <LinearProgress color="secondary"/>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <>    
      <DataGrid
       dir="rtl"
      rows={filteredRows.map((item) => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        phone: item.phone,
        city: item.city,
        neighborhood: item.neighborhood,
      }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            onDeleteClick: handleDeleteClick,
            selectedRows: selectedRows,
          },
        }}
        onRowSelectionModelChange={handleRowSelection}
        pageSizeOptions={[10, 20]}
        checkboxSelection 
        
      />  </>)}
    </div>
  
  );
}