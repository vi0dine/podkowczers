import React from "react";
import {Route, Switch} from 'react-router';
import {LoginPage} from "./pages/LoginPage/LoginPage.component";
import {UsersPage} from "./pages/UsersPage/UsersPage.component";
import {UserPage} from "./pages/UserPage/UserPage.component";


export const routes = (
    <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path={'/users'} component={UsersPage} />
        <Route exact path={'/users/:id'} component={UserPage} />
    </Switch>
);
