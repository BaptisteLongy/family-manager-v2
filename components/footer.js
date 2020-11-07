
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function Footer() {
    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item >
                    Powered by Baptiste - Family Manager v2
                </Grid>
                <Grid item >
                    <a href="https://github.com/BaptisteLongy/family-manage-v2">GitHub</a>
                </Grid>
            </Grid>
        </Container>
    )
}