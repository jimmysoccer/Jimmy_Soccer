import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstname',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastname',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'birthdate',
    headerName: 'Birth Date',
    width: 110,
    editable: true,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 160,
  },
];

export default function DataTable({ rows }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}
        // pageSizeOptions={[10]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}
