import React, { useCallback, useState } from 'react';
import { ViewContainer } from '../../components/ViewContainer/ViewContainer';
import { Calendar, useStaticState } from '@material-ui/pickers';
import { MessageBox } from '../../components/MessageBox/MessageBox';
import image from './3684518.jpg';
import { makeStyles } from '@material-ui/styles';
import { Paper, Theme } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useHistory } from 'react-router';
import moment from 'moment';
import { StatisticsMessageBox } from '../../components/Statistic/StatisticsMessageBox';
import { useWorkingTimeHelper } from '../../tools/hooks/useWorkingTimeHelper';

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
        },
    }),
    { name: 'HomeView' }
);

const today = new Date();

export const HomeView = () => {
    const classes = useStyles();
    const history = useHistory();

    const [date, setDate] = useState<Date>(new Date());
    const { workingTimes } = useWorkingTimeHelper({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    });

    const handleDateChange = useCallback((date: MaterialUiPickersDate) => {
        if (!date) {
            return;
        }

        history.push({
            pathname: '/capture',
            search: `?date=${date.toISOString()}`,
        });
    }, []);

    const handleMonthChange = (nextDate: MaterialUiPickersDate) => {
        setDate(moment(nextDate).toDate());
    };

    const { pickerProps } = useStaticState({
        value: today,
        onChange: handleDateChange,
    });

    return (
        <ViewContainer contentClassName={classes.root} title='Home'>
            <MessageBox
                headline='Willkommen'
                text='Schön das du wieder hier bist. Klicke im Kalender auf einen Tag um dort eine Arbeitszeit Erfassung durchzuführen.'
                imageSrc={image}
            />
            <Paper>
                <Calendar onMonthChange={handleMonthChange} {...pickerProps} />
            </Paper>
            <StatisticsMessageBox
                variant='month'
                workingTimes={workingTimes}
                date={date}
            />
        </ViewContainer>
    );
};
