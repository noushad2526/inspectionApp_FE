import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// // Define your CustomToolbar component
// const CustomToolbar = () => {
//     return (
//         <GridToolbarContainer>
//             <GridToolbarExport />
//         </GridToolbarContainer>
//     );
// }

// Define your StyledDataGrid component
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-root': {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        '& .MuiDataGrid-viewport': {
            minHeight: 300,
        },
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    // Add more styling here as needed
}));

StyledDataGrid.defaultProps = {
    checkboxSelection: true,
    disableRowSelectionOnClick: true,
    disableColumnFilter: true,
    disableColumnSelector: true,
    disableDensitySelector: true,
    rowHeight: 75,
    slots: {
        toolbar: GridToolbar,
    },
    initialState: {
        pagination: { pageSize: 5 },
    },
    pageSizeOptions: [5, 10, 25],
    slotProps: {
        toolbar: {
            showQuickFilter: true,
        },
    },
};

export default StyledDataGrid;
