import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// Define your CustomToolbar component
const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

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
    rowHeight: 75,
    slots: {
        toolbar: CustomToolbar
    },
    initialState: {
        pagination: { paginationModel: { pageSize: 5 } },
    },
    pageSizeOptions: [5, 10, 25],
};

export default StyledDataGrid;
