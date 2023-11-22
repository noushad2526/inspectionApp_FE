import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
    IconButton,
    MenuItem,
    Popover
} from '@mui/material';
import Iconify from '../iconify/Iconify';

function ActionMenu({ onClickEdit, onClickDelete, onClickShare, disableEdit, disableDelete, disableShare }) {
    const [open, setOpen] = useState(null);

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    return (
        <>
            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                {!disableEdit && <MenuItem onClick={onClickEdit}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>}

                {!disableShare && <MenuItem sx={{ color: 'info.main' }} onClick={onClickShare}>
                    <Iconify icon={'eva:paper-plane-outline'} sx={{ mr: 2 }} />
                    Share QR
                </MenuItem>}

                {!disableDelete && <MenuItem sx={{ color: 'error.main' }} onClick={onClickDelete}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>}

            </Popover>
        </>
    );
}

export default ActionMenu;

ActionMenu.propTypes = {
    onClickEdit: PropTypes.bool,
    onClickDelete: PropTypes.bool,
    onClickShare: PropTypes.bool,
    disableEdit: PropTypes.bool,
    disableDelete: PropTypes.bool,
    disableShare: PropTypes.bool,
};

ActionMenu.defaultProps = {
    onClickEdit: false,
    onClickDelete: false,
    onClickShare: false,
    disableEdit: false,
    disableDelete: false,
    disableShare: false,
};