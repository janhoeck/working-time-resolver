import React, {useCallback, useState} from 'react';
import {ViewContainer} from '../../components/ViewContainer/ViewContainer';
import {Calendar, useStaticState} from '@material-ui/pickers';
import {MessageBox} from '../../components/MessageBox/MessageBox';
import image from './3684518.jpg';
import {makeStyles} from '@material-ui/styles';
import {Paper, Theme} from '@material-ui/core';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';
import { useHistory} from 'react-router';

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
    }
}), { name: 'HomeView' });

const today = new Date();

export const HomeView = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleDateChange = useCallback((date: MaterialUiPickersDate) => {
        if(!date) {
            return;
        }

        history.push({ pathname: '/capture', search: `?date=${date.toUTCString()}`})
    }, [])

    const { pickerProps } = useStaticState({
        value: today,
        onChange: handleDateChange,
    });

    return (
        <ViewContainer contentClassName={classes.root} title='Home'>
            <MessageBox headline='Willkommen' text='Schön das du wieder hier bist. Klicke im Kalender auf einen Tag um dort eine Arbeitszeit Erfassung durchzuführen.' imageSrc={image}/>
            <Paper>
                <Calendar {...pickerProps} />
            </Paper>
        </ViewContainer>
    )
}
