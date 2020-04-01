import React from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';
import clsx from 'clsx';
import * as ROUTES from '../../../shared/routes';
import * as ACCESSLEVEL from '../../../shared/accessLevel';
import {AuthUserContext} from '../../Session'

import {Checkbox, withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import TuneIcon from '@material-ui/icons/Tune';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {withFirebase} from '../../Firebase';
import SortControls from "../SortControls/SortControls";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    activeListItem: {
        color: theme.palette.primary.main
    },
    checkBox: {
        marginLeft: 0
    },
    avatar: {
        margin: 10,
        width: 30,
        height: 30
    },
    nonAuth: {
        textAlign: 'center',
        maxWidth: 150
    },
    user: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

const MySideDrawer = withStyles(styles)(
    ({
         classes, variant, open, onClose, onItemClick, firebase
     }) => {
        const SideDrawerNonAuth = () => (
            <List>
                <Typography className={classes.nonAuth} variant='subtitle1'>
                    This App needs authentication
                </Typography>
                <NavItem
                    to={ROUTES.SIGN_IN}
                    text='Sign in'
                    Icon={LockOpenIcon}
                    onClick={onItemClick()}
                />
                <NavItem
                    to={ROUTES.SIGN_UP}
                    text='Sign up'
                    Icon={PersonOutlineIcon}
                    onClick={onItemClick()}
                />
            </List>
        );

        const SideDrawerAuth = ({authUser}) => {
            return (
                <List>
                    <ListSubheader className={classes.user}>
                        {authUser.firstName + ' ' + authUser.lastName}
                        <Avatar className={classes.avatar}
                                alt='logged in user'
                                src={authUser.imageUrl}/>
                    </ListSubheader>
                    <NavItem
                        to={ROUTES.ACCOUNT}
                        text='Account'
                        Icon={TuneIcon}
                        onClick={onItemClick()}
                    />
                    <NavItem
                        to={ROUTES.SIGN_OUT}
                        text='Logout'
                        Icon={ExitToAppIcon}
                        onClick={onItemClick()}
                    />
                    <ListSubheader>
                        Settings
                    </ListSubheader>
                    <ListItem>
                        <ListItemText>Show Details</ListItemText>
                        <ListItemSecondaryAction>
                            <Checkbox
                                value={authUser.preferences.showDetails}
                                onChange={() => firebase.setPreferences(
                                    {showDetails: !authUser.preferences.showDetails})}
                                checked={authUser.preferences.showDetails}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Show cart</ListItemText>
                        <ListItemSecondaryAction>
                            <Checkbox
                                value={authUser.preferences.isBuying}
                                onChange={() => firebase.setPreferences(
                                    {isBuying: !authUser.preferences.isBuying})}
                                checked={authUser.preferences.isBuying}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <SortControls authUser={authUser}/>
                    </ListItem>
                    <ListSubheader>
                        Navigation
                    </ListSubheader>
                    <NavItem
                        to={ROUTES.LANDING}
                        text='Landing'
                        Icon={HomeIcon}
                        onClick={onItemClick()}
                    />
                    <NavItem
                        to={ROUTES.HOME}
                        text='Home'
                        Icon={HomeIcon}
                        onClick={onItemClick()}
                    />
                    {(authUser.accessLevel >= ACCESSLEVEL.ADMINISTRATOR) && (
                        <NavItem
                            to={ROUTES.ADMIN}
                            text='ADMIN'
                            Icon={SupervisorAccountIcon}
                            onClick={onItemClick()}
                        />
                    )}
                </List>)
        };

        return (
            <Drawer variant={variant} open={open} onClose={onClose}>
                {/*div to offset the drawer with the heighth of the Toolbar, when the variant is persistent*/}
                <div
                    className={clsx({
                        [classes.toolbarMargin]: variant === 'persistent'
                    })}
                />
                <AuthUserContext.Consumer>
                    {authUser => authUser ? <SideDrawerAuth authUser={authUser}/> : <SideDrawerNonAuth/>}
                </AuthUserContext.Consumer>
            </Drawer>
        )
    }
);

const NavListItem = withStyles(styles)(
    ({classes, Icon, text, active, disabled, ...other}) => (
        <ListItem disabled={disabled} button component={NavLink} {...other}>
            <ListItemIcon
                classes={{
                    root: clsx({[classes.activeListItem]: active})
                    //   The clsx() function is used extensively by Material-UI–this isn't an extra dependency.
                    //   It allows you to dynamically change the class of an element without introducing custom logic into your markup.
                    //   For example, the clsx({ [classes.activeListItem]: active }) syntax will only apply the activeListItem class if active is true.
                    //   The alternative will involve introducing more logic into your component.
                }}
            >
                <Icon/>
            </ListItemIcon>
            <ListItemText
                classes={{
                    primary: clsx({
                        [classes.activeListItem]: active
                    })
                }}
            >
                {text}
            </ListItemText>
        </ListItem>
    )
);

const NavItem = props => (
    <Switch>
        <Route
            exact
            path={props.to}
            render={() => <NavListItem active={true} {...props} />}
        />
        <Route path='/' render={() => <NavListItem {...props} />}/>
    </Switch>
);

export default withFirebase(MySideDrawer);
