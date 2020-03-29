import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import withStyles from '@material-ui/core/styles/withStyles'
import {AuthUserContext, withAuthorization} from '../Session/';
import {Select} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import {IconButton} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import {withFirebase} from "../Firebase";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {compareValues} from "../../shared/utility";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const styles = theme => ({
    root: {
        padding: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1),
    },
    sort: {
        width: '90%'
    }
});
/**
 * Created by Doa on 27-1-2020.
 */
const Home = withStyles(styles)(
    ({classes, firebase, data, onAddItem, onFetchAllData, onSaveExampleData, history}) => {

        const [isLoading, setLoading] = useState(true);

        useEffect(() => {
            if (isLoading) {
                onFetchAllData(firebase);
                setLoading(false);
            }
        }, [isLoading]);

        // cleanup
        useEffect(() => () => firebase.data().off(), []);

        const setOrder = (event) => {
            firebase.setPreferences({sortBy: event.target.value})
        };

        const direction = (isAscending) => {
            firebase.setPreferences({isAscending: !isAscending})
        };

        const addNewItem = (number) => {
            const item = {
                name: 'item ' + number,
                category: 'category ' + number,
                store: 'store' + number,
                day: number
            };
            onAddItem(firebase, item);
        };

        const showDetails = (item) => {
            history.push({
                pathname: '/details',
                state: {item: item}
            })
        };


        return (
            <AuthUserContext.Consumer>
                {authUser => {
                    let group = '';
                    let sortDirection = (authUser.preferences.isAscending) ? 'asc' : 'desc';
                    const sort = authUser.preferences.sortBy;
                    return (
                        <Container component='main' maxWidth='sm'>
                            <CssBaseline/>
                            <div className={classes.root}>
                                <h1>Home Page of {authUser.firstName}</h1>
                                <p>The Home Page is accessible by every signed in user.
                                    <Button onClick={() => onSaveExampleData(firebase)}>
                                        Get example data
                                    </Button>
                                </p>
                                <Select value={sort}
                                        onChange={setOrder}
                                        className={classes.sort}
                                        label='Sort by'>
                                    <MenuItem value='category'>Category</MenuItem>
                                    <MenuItem value='store'>Store</MenuItem>
                                    <MenuItem value='day'>Day</MenuItem>
                                </Select>
                                <IconButton onClick={() => direction(authUser.preferences.isAscending)}>
                                    {authUser.preferences.isAscending ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                                </IconButton>
                                <List component="nav">
                                    {data.sort(compareValues(sort, sortDirection)).map((item, index) => {
                                        let groupHeader = null;
                                        if (item[sort] !== group) {
                                            group = item[sort];
                                            groupHeader = (
                                                <ListSubheader>
                                                    {group}
                                                </ListSubheader>)
                                        }
                                        return (
                                            <div key={index}>
                                                {groupHeader}
                                                <ListItem button dense divider onClick={() => showDetails(item)}>
                                                    <ListItemIcon>
                                                        <LabelIcon color="primary"/>
                                                    </ListItemIcon>
                                                    {authUser.preferences.showDetails
                                                        ? <ListItemText primary={item.name}
                                                                        secondary={item.store + ' - ' + item.day}/>
                                                        : <ListItemText primary={item.name}/>
                                                    }


                                                </ListItem>
                                            </div>
                                        )
                                    })}
                                </List>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => (addNewItem(data.length + 1))}
                                    startIcon={<AddIcon/>}
                                >
                                    Add new Item
                                </Button>
                            </div>
                        </Container>
                    )
                }}
            </AuthUserContext.Consumer>
        );
    });

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: (firebase, item) => dispatch(actions.addItem(firebase, item)),
        onFetchAllData: (firebase) => dispatch(actions.fetchData(firebase)),
        onSaveExampleData: (firebase) => dispatch(actions.saveExampleData(firebase))
    }
};

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    withAuthorization(condition))(Home);