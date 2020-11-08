import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Divider from '@material-ui/core/Divider';
import React from 'react'


export default function Footer() {
    return (
        <React.Fragment>
            <Divider />
            <Grid
                container
                direction="row"
                justify="space-between"
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