import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, styled } from '@mui/material';

const LoadingLayerWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const BlockingDiv = styled('div')({
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Disables any user interactions with the component
});

const MessageAndCircularProgress = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const CircularProgressWrapper = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
}));


const LoadingLayer = ({ message, color }) => {

    return (
        <LoadingLayerWrapper>
            <BlockingDiv>
                <MessageAndCircularProgress>
                    <CircularProgressWrapper size={30} thickness={8} />
                    <Typography variant="h4" color={color}>
                        {message}
                    </Typography>
                </MessageAndCircularProgress>
            </BlockingDiv>
        </LoadingLayerWrapper>
    );
};

LoadingLayer.propTypes = {
    message: PropTypes.string,
    color: PropTypes.string
};

LoadingLayer.defaultProps = {
    message: 'Loading',
    color: "textSecondary"
};

export default LoadingLayer;
