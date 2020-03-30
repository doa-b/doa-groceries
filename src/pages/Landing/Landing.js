import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {getDoaData} from "../../bootstrap/data";

const styles = theme => ({
    root: {},
});
/**
 * Created by Doa on 27-1-2020.
 */
const Landing = withStyles(styles)(
    ({classes}) => {
        console.log(getDoaData());
        return (
            <>
            </>);
    });

export default Landing;