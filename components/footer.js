import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import React from 'react'


export default function Footer() {
    return (
        <React.Fragment>
            <Divider />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item >
                    Family Manager v2 - Powered by Baptiste
                </Grid>
                <Grid item >
                    <IconButton aria-label="GitHub.com" onClick={() => window.open('https://github.com/BaptisteLongy/family-manage-v2', "_blank")}>
                        <GitHubIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}