import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import Layout from './hoc/Layout/Layout';
import * as ROUTES from './shared/routes';

import { withAuthentication } from './components/Session'

const landingPage = asyncComponent(() => {
    return import ('./pages/Landing/Landing')
});

const signUpPage = asyncComponent(() => {
    return import ('./pages/authentication/SignUp/SignUp')
});

const signInPage = asyncComponent(() => {
    return import ('./pages/authentication/SignIn/SignIn')
});

const signOutPage = asyncComponent(() => {
    return import ('./pages/authentication/SignOut/SignOut')
});
const homePage = asyncComponent(() => {
    return import ('./pages/Home/Home')
});
const accountPage = asyncComponent(() => {
    return import ('./pages/authentication/Account/Account')
});
const adminPage = asyncComponent(() => {
    return import ('./pages/Admin/Admin')
});
const passwordForgetPage = asyncComponent(() => {
    return import ('./pages/authentication/PasswordForget/PasswordForget')
});
const privacyPolicyPage = asyncComponent(() => {
    return import ('./pages/PrivacyPolicy/PrivacyPolicy')
});
const detailsPage = asyncComponent(() => {
    return import ('./pages/details')
});

/**
 * Created by Doa on 27-1-2020.
 */

const routes = (
    <Switch>
        <Route exact path={ROUTES.LANDING} component={landingPage} />
        <Route path={ROUTES.SIGN_UP} component={signUpPage} />
        <Route path={ROUTES.SIGN_IN} component={signInPage} />
        <Route path={ROUTES.SIGN_OUT} component={signOutPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={passwordForgetPage} />
        <Route path={ROUTES.HOME} component={homePage} />
        <Route path={ROUTES.ACCOUNT} component={accountPage} />
        <Route path={ROUTES.ADMIN} component={adminPage} />
        <Route path={ROUTES.PRIVACY_POLICY} component={privacyPolicyPage} />
        <Route path={ROUTES.DETAILS} component={detailsPage} />
    </Switch>
);

const App = (props) => {
    return (
        <Router>
            <Layout variant='temporary'>
                {routes}
            </Layout>
        </Router>
    );
};

export default withAuthentication(App);