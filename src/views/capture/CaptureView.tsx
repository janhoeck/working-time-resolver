import React, { useState } from 'react';
import { ViewContainer } from '../../components/ViewContainer/ViewContainer';
import { Divider, IconButton, Paper, Theme } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useLocation } from 'react-router';
import qs from 'qs';
import { v4 as uuidv4 } from 'uuid';
import { WorkingTimeItem } from './item/WorkingTimeItem';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useWorkingTimeHelper } from '../../tools/hooks/useWorkingTimeHelper';
import { getDay, getMonth, getYear } from '../../tools/MomentUtils';
import { CreateWorkingTimeModal } from './create/CreateWorkingTimeModal';
import {
    WorkingTime,
    WorkingTimeType,
} from '../../tools/types/WorkingTimeType';
import { StatisticsMessageBox } from '../../components/Statistic/StatisticsMessageBox';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
        },
    }),
    { name: 'CaptureView' }
);

export const CaptureView = () => {
    const classes = useStyles();
    const location = useLocation();
    const parsedParams = qs.parse(location.search, { ignoreQueryPrefix: true });
    const date = moment(parsedParams.date as string).toDate();

    const [isOpen, setOpen] = useState<boolean>(false);

    const { workingTimes, add, remove } = useWorkingTimeHelper({
        year: getYear(date),
        month: getMonth(date),
        day: getDay(date),
    });

    const handleAddWorkingTime = (
        from: Date,
        to: Date,
        type: WorkingTimeType
    ) => {
        setOpen(false);
        add({
            id: uuidv4(),
            date: date,
            from: from,
            to: to,
            type: type,
        });
    };

    const handleAdd = () => setOpen(true);
    const handleCancel = () => setOpen(false);

    return (
        <ViewContainer
            contentClassName={classes.root}
            title='Erfassung'
            action={
                <IconButton color='inherit' onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
            }
        >
            <StatisticsMessageBox date={date} workingTimes={workingTimes} />
            <Paper>
                {workingTimes.map((workingTime) => (
                    <motion.div
                        key={workingTime.id}
                        animate={{ y: 0, opacity: 1 }}
                        initial={{ y: -30, opacity: 0 }}
                    >
                        <WorkingTimeItem
                            workingTime={workingTime}
                            onDelete={remove}
                        />
                        <Divider />
                    </motion.div>
                ))}
            </Paper>
            <CreateWorkingTimeModal
                open={isOpen}
                onAdd={handleAddWorkingTime}
                onCancel={handleCancel}
            />
        </ViewContainer>
    );
};
