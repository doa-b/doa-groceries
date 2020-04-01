import React from 'react';
import {withFirebase} from "../../Firebase";
import withStyles from '@material-ui/core/styles/withStyles'
import {IconButton, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from '@material-ui/core/FormHelperText';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
    root: {},
    sort: {
        width: 140
    },
    sortBy: {
        flexDirection: 'column',
        width: 150,
    },
    sortContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    directionButton: {
        marginBottom: 20
    }
});

/**
 * Created by Doa on 1-4-2020.
 */
const SortControls = withStyles(styles)(
    ({classes, firebase, authUser}) => {

        const setOrder = (event) => {
            firebase.setPreferences({sortBy: event.target.value})
        };

        const direction = (isAscending) => {
            firebase.setPreferences({isAscending: !isAscending})
        };
        return (
            <div className={classes.sortContainer}>
                <div className={classes.sortBy}>
                    <Select value={authUser.preferences.sortBy}
                            onChange={setOrder}
                            className={classes.sort}
                            label='Sort by'
                            IconComponent={()=>{return null}}>
                        <MenuItem value='category'>Category</MenuItem>
                        <MenuItem value='store'>Store</MenuItem>
                        <MenuItem value='day'>Day</MenuItem>
                    </Select>
                    <FormHelperText>Sort by</FormHelperText>
                </div>
                <ListItemSecondaryAction>
                    <IconButton
                        className={classes.directionButton}
                        onClick={() => direction(authUser.preferences.isAscending)}>
                        {authUser.preferences.isAscending ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                    </IconButton>
                </ListItemSecondaryAction>
            </div>
        );
    });

export default withFirebase(SortControls);