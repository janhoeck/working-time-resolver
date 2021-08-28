import React, { useMemo } from 'react';
import {
    Grid,
    LinearProgress,
    Menu,
    MenuItem,
    Theme,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import clsx from 'clsx';
import { WorkingTime } from '../../../tools/types/WorkingTimeType';
import { useAnchorElementHelper } from '../../../tools/hooks/useAnchorElementHelper';

export interface WorkingTimeCardProps {
    workingTime: WorkingTime;
    onDelete: (workingTime: WorkingTime) => void;
}

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            display: 'flex',
        },
        content: {
            padding: theme.spacing(1),
            flex: 1,
        },
        progress: {
            height: 8,
            borderRadius: 4,
        },
        type: {
            width: 10,
            backgroundColor: 'red',
        },
        workingType: {
            backgroundColor: '#15a8d4',
        },
        breakType: {
            backgroundColor: '#d4b315',
        },
    }),
    { name: 'WorkingTimeItem' }
);

export const WorkingTimeItem = (props: WorkingTimeCardProps) => {
    const { workingTime, onDelete } = props;
    const classes = useStyles(props);

    const { anchorElement, isOpen, open, close } = useAnchorElementHelper();

    const differenceInMinutes = useMemo(() => {
        const from = moment(workingTime.from);
        const to = moment(workingTime.to);

        return to.diff(from, 'minutes');
    }, [workingTime]);

    const differenceFormatted = useMemo(() => {
        return moment()
            .startOf('day')
            .minutes(differenceInMinutes)
            .format('H:mm');
    }, [differenceInMinutes]);

    const handleClickDelete = () => {
        close();
        onDelete(workingTime);
    };

    return (
        <React.Fragment>
            <div className={classes.root} onClick={open}>
                <div
                    className={clsx(
                        classes.type,
                        classes[`${workingTime.type}Type`]
                    )}
                />
                <div className={classes.content}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={4}>
                            <Typography>
                                {moment(workingTime.from).format('HH:mm [Uhr]')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                {moment(workingTime.to).format('HH:mm [Uhr]')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{differenceFormatted} Std</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={4}>
                            <Typography variant='caption' color='textSecondary'>
                                Von
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='caption' color='textSecondary'>
                                Bis
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <LinearProgress
                                style={{
                                    // 480 in minutes means 8 hours. 8 or more hours means 100%
                                    width: `${
                                        ((differenceInMinutes > 480
                                            ? 480
                                            : differenceInMinutes) /
                                            480) *
                                        100
                                    }%`,
                                }}
                                className={classes.progress}
                                variant='determinate'
                                value={100}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Menu
                open={isOpen}
                anchorEl={anchorElement}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={close}
            >
                <MenuItem onClick={handleClickDelete}>Löschen</MenuItem>
            </Menu>
        </React.Fragment>
    );
};
