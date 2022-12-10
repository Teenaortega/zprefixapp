import React, { useState } from 'react';
import { DataGrid, gridClasses, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { styled, createTheme } from '@mui/material/styles';
import CustomNoRowsOverlay from './StyledGridOverlay';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const Grid = ({ columns, data, autoHeight }) => {

  const [status] = React.useState('connected');
  const [auto] = useState(autoHeight);

  const myTheme = createTheme({
    palette: {
      primary: {
        main: '#9196a3',
      },
      secondary: {
        main: '#555a66',
      },
    },
  });

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.primary.main,
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const CustomFooterStatusComponent = (props) => {
    return (
      <Box sx={{
        p: 1,
        display: 'flex',
        bgcolor: '#80deea',
      }}>
        <FiberManualRecordIcon
          fontSize="small"
          sx={{
            mr: 1,
            color: props.status === 'connected' ? '#4caf50' : '#d9182e',
          }}
        />
        Status {props.status}
      </Box>
    );
  }

  CustomFooterStatusComponent.propTypes = {
    status: PropTypes.oneOf(['connected', 'disconnected']).isRequired,
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ backgroundColor: '#1f2024' }}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ height: '70vh', width: '90%', display: 'flex', pl: '10%' }}>
      <StripedDataGrid
        sx={{
          m: 10,
          background: '#555a66',
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .headers': {
            backgroundColor: '#555a66'
          },
        }}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          // Footer: CustomFooterStatusComponent,
          Toolbar: CustomToolbar
        }}
        componentsProps={{
          footer: { status },
        }}
        theme={myTheme}
        initialState={{
          sorting: {
            sortModel: [{ field: '__check__', sort: 'desc' }]
          },
          pagination: {
            pageSize: 25,
          },

        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        autoHeight={auto}
        columns={columns}
        rows={data}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Box>
  );
};

export default Grid;