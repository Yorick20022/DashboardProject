import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import App from './pages/dashboard.jsx'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;