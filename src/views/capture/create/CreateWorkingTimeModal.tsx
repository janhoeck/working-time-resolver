import React, { useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Theme,
    Typography,
} from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { WorkingTimeType } from '../../../tools/types/WorkingTimeType';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import moment from 'moment';

export interface CreateWorkingTimeModalProps {
    open: boolean;
    onAdd: (from: Date, to: Date, type: WorkingTimeType) => void;
    onCancel: () => void;
}

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            padding: theme.spacing(2),
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            flex: 1,
        },
        buttonsContainer: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.grey['50'],
            display: 'flex',
            justifyContent: 'space-between',
        },
    }),
    { name: 'CreateWorkingTimeModal' }
);

export const CreateWorkingTimeModal = (props: CreateWorkingTimeModalProps) => {
    const { open, onAdd, onCancel } = props;
    const classes = useStyles(props);

    const [from, setFrom] = useState<Date>(new Date());
    const [to, setTo] = useState<Date>(new Date());
    const [type, setType] = useState<WorkingTimeType>('working');

    const handleConfirm = () => {
        onAdd(from, to, type);
    };

    const handleTypeChange: SelectInputProps['onChange'] = (event) => {
        setType(event.target.value as WorkingTimeType);
    };

    const handleFromDateChange = (date: MaterialUiPickersDate) => {
        if (!date) {
            return;
        }

        // if date is after to, then set to after from
        if (date.isAfter(to)) {
            setTo(date.add(1, 'hours').toDate());
        }
        setFrom(date.toDate());
    };

    const handleToDateChange = (date: MaterialUiPickersDate) => {
        if (!date) {
            return;
        }

        // if date is before from, then set to after from
        if (date.isBefore(from)) {
            setTo(moment(from).add(1, 'hours').toDate());
        } else {
            setTo(date.toDate());
        }
    };

    return (
        <Modal open={open}>
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography variant='h6'>Zeit hinzufügen</Typography>
                </div>
                <div className={classes.content}>
                    <TimePicker
                        clearable
                        ampm={false}
                        label='Von'
                        value={from}
                        onChange={handleFromDateChange}
                    />
                    <TimePicker
                        clearable
                        ampm={false}
                        label='Bis'
                        value={to}
                        onChange={handleToDateChange}
                    />
                    <FormControl>
                        <InputLabel id='typ-label'>Typ</InputLabel>
                        <Select
                            value={type}
                            labelId='typ-label'
                            onChange={handleTypeChange}
                        >
                            <MenuItem value='working'>Arbeitszeit</MenuItem>
                            <MenuItem value='break'>Pause</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button disableElevation onClick={onCancel}>
                        Abbrechen
                    </Button>
                    <Button
                        disableElevation
                        variant='contained'
                        color='secondary'
                        onClick={handleConfirm}
                    >
                        Hinzufügen
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};
