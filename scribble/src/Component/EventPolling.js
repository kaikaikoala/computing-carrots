import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
});

function GridTest(props){
    var numbers=[['time1','people: 5','Kaishin, Juhsep, Kaori, Shark, you'],
        ['time2','people: 3','Hello, julie, animals'],
        ['time3','people: 7','kumi, stop, a, talkin, you, agree, Thank you']
    ];
    const listItems = numbers.map((number)=>
        <Grid container spacing = {0}>
            <Grid item xs={4}><Typography variant="h6">{number[0]}</Typography></Grid>
            <Grid item xs={7}>
        <Typography variant="h6">{number[1]}</Typography>
        <Hidden xsDown><Typography paragraph>{number[2]}</Typography></Hidden>
            </Grid>
            <Grid item xs={1}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            </Grid>
        </Grid>
    );
    return(
        <div>
        {listItems}
        </div>
    );
}

class EventPolling extends React.Component {
    render() {
        return(
            <div>
            <GridTest/>
            </div>
        );
    }
}

EventPolling.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EventPolling);
