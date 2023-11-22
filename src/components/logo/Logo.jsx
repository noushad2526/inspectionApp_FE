import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Avatar } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, link = '/', image, sx, ...other }, ref) => {

  const defaultLogo = (
    <img
      src={`${process.env.PUBLIC_URL}/assets/appmomos_logo.png`}
      alt='logo'
    />
  );

  const logo = (
    <Box ref={ref} component="div" sx={{ width: 40, height: 40, display: 'inline-flex', ...sx, }}{...other}>
      {defaultLogo}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to={link} component={RouterLink} sx={{ display: 'contents' }}>
      {image ? (<Avatar src={image}>{logo}</Avatar>) : (logo)}</Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  link: PropTypes.string,
  image: PropTypes.string,
};

export default Logo;
