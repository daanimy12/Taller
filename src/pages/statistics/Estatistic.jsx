import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];
const Estatistic = () => {
    const theme = useTheme();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={6}>
                <Paper>
                    <h3>Hello, </h3>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                <Paper>
                    <h3>Friend </h3>
                </Paper>
            </Grid>
        </Grid>
    )

}

export default Estatistic;