import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from "redux";
import {AuthUserContext} from '../../Session'
import {withFirebase} from "../../Firebase";
import * as ROUTES from '../../../shared/routes'

import {Tooltip, withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from "@material-ui/core/Badge";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import ListAltIcon from '@material-ui/icons/ListAltOutlined';
import NavigationBackButton from "./NavigationBackButton";


const styles = theme => ({
    menuButton: {
        marginLeft: -12,
    },
    backButton: {
        marginLeft: -12,
    },
    toolBar: {
        alignItems: 'center'
    },
    corner: {
        marginLeft: 'auto'
    },
    displayIcon: {
        marginRight: 10
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        height: 35,
        marginTop: 5,
        marginRight: 10
    },
    message: {
        color: 'inherit'
    }
});

const MyToolbar = withStyles(styles)(
    ({classes, title, onMenuClick, firebase, data}) => {
        const itemCounter = data.filter(item => item.mustBuy === true).length;

        return (
            <>
                <AppBar className={classes.aboveDrawer}>
                    <Toolbar className={classes.toolBar}>
                        <IconButton
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='Menu'
                            onClick={onMenuClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                       <NavigationBackButton/>
                        <Typography
                            variant='h5'
                            color='inherit'
                            className={classes.flex}
                        >
                            {title}
                        </Typography>
                        <div className={classes.corner}>
                        </div>
                        <AuthUserContext.Consumer>
                            {authUser => authUser ? (
                                <>
                                    <IconButton color="inherit" className={classes.displayIcon}
                                                onClick={() => firebase.setPreferences({isBuying: !authUser.preferences.isBuying})}>
                                        <Badge badgeContent={itemCounter} color="secondary"
                                               anchorOrigin={{horizontal: "right", vertical: "top"}}>
                                            {authUser.preferences.isBuying
                                                ? <ListAltIcon/>
                                                : <ShoppingCartIcon/>}
                                        </Badge>

                                    </IconButton>
                                    <Avatar
                                        alt='logged in user'
                                        src={authUser.imageUrl}/>
                                </>

                            ) : null}

                        </AuthUserContext.Consumer>
                    </Toolbar>
                </AppBar>
                <div className={classes.toolbarMargin}/>
            </>
        )
    }
);

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(MyToolbar);