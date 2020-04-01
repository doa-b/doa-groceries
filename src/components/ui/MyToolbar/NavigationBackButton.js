import React from 'react';
import {withRouter} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const styles = theme => ({
    backButton: {
        marginLeft: -12,
    },
});
/**
 * Created by Doa on 31-3-2020.
 */
const NavigationBackButton = withStyles(styles)(
    ({classes, history}) => {
        const path = history.location.pathname;
        if (path === '/home' || path === '/') return null;
        return (
            <IconButton
                className={classes.backButton}
                color='inherit'
                aria-label='Back'
                onClick={()=>history.goBack()}>
                <ArrowBackIcon/>
            </IconButton>);
    });

export default withRouter(NavigationBackButton);