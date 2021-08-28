import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeView } from './views/home/HomeView';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CssBaseline } from '@material-ui/core';
import './index.css';
import { CaptureView } from './views/capture/CaptureView';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

moment.locale('de');

export const App = () => (
    <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter>
                <CssBaseline />
                <Switch>
                    <Route exact path='/' component={HomeView} />
                    <Route exact path='/capture' component={CaptureView} />
                </Switch>
            </BrowserRouter>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
);
