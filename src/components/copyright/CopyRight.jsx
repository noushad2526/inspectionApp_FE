import { Link } from "react-router-dom";
// @mui
import { Typography } from "@mui/material";


export default function Copyright(props) {
    return (

        <Typography variant="body2" align="center" {...props} >
            {'Copyright ©'}
            <Link to="#" style={{ color: 'black' }} target="_blank">
                yourcompanyname
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}