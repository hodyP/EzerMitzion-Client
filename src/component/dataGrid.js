import * as React from 'react';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';

import axios from 'axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {field: 'phone',headerName: 'Phone', type: 'phone',width: 130},
  {field: 'city',headerName: 'City', type: 'city',width: 130},
  {field: 'neighberhood',headerName: 'Neighberhood',width: 180}
];

export default function DataTable(props) {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch data from the server using an HTTP request.
    axios.get(props.url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [props.url]); // Empty dependency array means this effect runs once on component mount.


 

  return (
    <div style={{ height: 400, width: '100%' }}>
        {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
      <DataGrid
        rows={data.map((item)=>({id:item.id,lastName:item.last_name,phone:item.phone.toString()
       , city:"Jerusalem",neighberhood:item.neighborhood}))}
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
       
      />)}
    </div>
  );
}