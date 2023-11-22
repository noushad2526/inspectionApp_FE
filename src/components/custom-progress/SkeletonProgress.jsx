import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Typography, LinearProgress, Stack, Avatar, Grid } from '@mui/material';

const SkeletonProgress = ({
    skeletonHeight = 522,
    skeletonWidth = '100%',
    linearProgressWidth = '200px',
    linearProgressMT = "50%"
}) => {
    const typography = "Appmomos";
    return (
        <Stack sx={{ position: 'relative' }} alignItems="center" justifyContent="center">
            <LinearProgress
                sx={{
                    position: 'absolute',
                    top: linearProgressMT,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: linearProgressWidth,
                }}
                color="inherit"
            />
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{
                    flexDirection: 'row',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Grid item sx={{ mb: 1 }}>
                    <Avatar sx={{ height: '40px', width: '40px', borderRadius: 1 }} src={`${process.env.PUBLIC_URL}/assets/tapassavi_logo.png`} />
                </Grid>
                <Grid item sx={{ mb: 1 }}>
                    <Typography ml={1}>{typography}</Typography>
                </Grid>
            </Grid>
            <Skeleton
                animation="wave"
                variant="rounded"
                width={skeletonWidth}
                height={skeletonHeight}
            />
        </Stack>
    );
};

SkeletonProgress.propTypes = {
    skeletonHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    skeletonWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    linearProgressWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    linearProgressMT: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SkeletonProgress;
