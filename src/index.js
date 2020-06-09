import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route}from 'react-router-dom';
import App from './App';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">
                        Lista alimentacao
                    </Typography>
                </Toolbar>
        </AppBar>
        </Switch>
            <Route path="/" exact>
                <App/>
            </Route>
    </BrowserRouter>
    , document.getElementById('root'));

