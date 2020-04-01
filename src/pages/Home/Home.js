import React, {useState, useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles'
import {AuthUserContext, withAuthorization} from '../../components/Session';
import {Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {IconButton} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import {withFirebase} from '../../components/Firebase';
import * as actions from '../../store/actions';

import {compareValues} from '../../shared/utility';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Item from "../../components/Item/Item";
import SortControls from "../../components/ui/SortControls/SortControls";

const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        marginTop: -18,
        maxWidth: 600
    },
    button: {
        margin: theme.spacing(1),
    },
    group: {
        color: 'grey',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 1,
        marginTop: 15,
        marginBotton: 10,
        borderTop: '1px solid #ddd',
        borderLeft: '1px solid #ddd',
        borderRight: '1px solid #ddd',
    }
});
/**
 * Created by Doa on 27-1-2020.
 */
const Home = withStyles(styles)(
    ({classes, firebase, data, onAddItem, onFetchAllData, onSaveExampleData, onSaveItem, history}) => {

        const [isLoading, setLoading] = useState(true);
        console.log(data.length)
        const hasData = data.length > 2;

        useEffect(() => {
            if (isLoading) {
                onFetchAllData(firebase);
                setLoading(false);
            }
        }, [isLoading]);

        // cleanup
        useEffect(() => () => firebase.data().off(), []);

        const addNewItem = (parameter) => {
            console.log(parameter);
            history.push({
                pathname: '/details',
                state: {item: parameter}
            });
        };

        const showDetails = (item) => {
            history.push({
                pathname: '/details',
                state: {item: item}
            })
        };

        const setToBuy = (item) => {
          console.log('clicked to buy');
            item.mustBuy = !item.mustBuy;
          onSaveItem(firebase, item);
        };

        return (
            <AuthUserContext.Consumer>
                {authUser => {
                    let group = '';
                    let sortDirection = (authUser.preferences.isAscending) ? 'asc' : 'desc';
                    const sort = authUser.preferences.sortBy;
                    return (
                        <>
                            <CssBaseline/>
                            <div className={classes.root}>
                                { !hasData &&
                                    <Button onClick={() => onSaveExampleData(firebase)}>
                                        Get example data
                                    </Button>}
                                <List>
                                    {data.sort(compareValues(sort, sortDirection)).map((item, index) => {
                                        let groupHeader = null;
                                        if (item[sort] !== group) {
                                            group = item[sort];
                                            groupHeader = (
                                                <div className={classes.group}>
                                                    <Typography variant="h6">
                                                    {group.toUpperCase()}
                                                    </Typography>
                                                    <IconButton onClick={addNewItem.bind(this, {[sort]: group})} size="small">
                                                        <AddIcon fontSize="small"/>
                                                    </IconButton>
                                                </div>)
                                        }
                                        return (
                                            <div key={index}>
                                                {groupHeader}
                                                <Item item={item}
                                                      detailsClicked={showDetails.bind(this, item)}
                                                      displayDetails={authUser.preferences.showDetails}
                                                      clickToBuy={setToBuy.bind(this, item)}
                                                      isBuying={authUser.preferences.isBuying}
                                                />
                                            </div>
                                        )
                                    })}
                                </List>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={addNewItem.bind(this, {category: 'new Category' + (data.length + 1)})}
                                    startIcon={<AddIcon/>}
                                >
                                    Add new Item
                                </Button>
                            </div>
                        </>
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
        onSaveExampleData: (firebase) => dispatch(actions.saveExampleData(firebase)),
        onSaveItem: (firebase, item) => dispatch(actions.saveItem(firebase, item))
    }
};

//  broad-grained authorization condition
const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    withAuthorization(condition))(Home);