import React from 'react';
import {Redirect} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from "@material-ui/core/Typography";
import {AuthUserContext} from "../../components/Session";
import * as ROUTES from '../../shared/routes'

const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-stert',
        justifyContent: 'center',
        width: '100%',
    },
});
/**
 * Created by Doa on 27-1-2020.
 */
const Landing = withStyles(styles)(
    ({classes}) => {
        return (
            <AuthUserContext.Consumer>
                {authUser => {
                    if (authUser) return <Redirect to={ROUTES.HOME}/>;
                    return (
                        <div className={classes.root}>
                            <Typography variant="h6">
                                Welcome to your groceries list
                            </Typography>
                            <Typography variant="body1">
                                To use this app you need to <a href={ROUTES.SIGN_UP}>create an account</a>
                            </Typography>
                            <Typography variant="body1">
                                or <a href={ROUTES.SIGN_UP}>sign in</a> with user
                                name <b>example</b> and password <b>000000</b> for a demo
                            </Typography>

                        </div>
                    )
                }}
            </AuthUserContext.Consumer>
         );
    });

export default Landing;