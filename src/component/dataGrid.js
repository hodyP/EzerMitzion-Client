import * as React from 'react';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';
const columns = [
  { field: 'id', headerName: 'מספר', width: 90 },
  { field: 'first_name', headerName: 'שם פרטי', width: 130 },
  { field: 'last_name', headerName: 'שם משפחה', width: 150 },
  { field: 'phone', headerName: 'טלפון', type: 'phone', width: 130 },
  { field: 'city', headerName: 'עיר', width: 130 },
  { field: 'neighborhood', headerName: 'שכונה', width: 180 },
];

export default function DataTable(props) {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  
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
 
  return (
    <div style={{ height: 400, width: '100%', direction: 'rtl' }}>
        {loading ? (
        <LinearProgress color="secondary"/>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <>
      <DataGrid
       dir="rtl"
      rows={data.map((item) => ({
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{
            toolbar: GridToolbar,
          }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
  
        onRowSelectionModelChange={(newRowSelectionModel) => {    
          props.handleSetRowSelectionModel(newRowSelectionModel);
          
        }}
      />  </>)}
    </div>
  
  );
}