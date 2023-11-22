// ----------------------------------------------------------------------

export default function DataGrid(theme) {
    return {
        MuiDataGrid: {
            styleOverrides: {
                // header
                columnHeaders: {
                    color: theme.palette.text.secondary,
                    backgroundColor: theme.palette.background.neutral,
                },
                // footer
                footerContainer: {
                    color: theme.palette.text.secondary,
                    backgroundColor: theme.palette.background.neutral,
                },
            },
        },
    };
}
