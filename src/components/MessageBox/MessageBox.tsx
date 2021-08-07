import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid, Paper, Theme, Typography} from '@material-ui/core';
import clsx from 'clsx';

export interface MessageBoxProps {
    className?: string;
    headline: string;
    text: string;
    imageSrc: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    image: {
        maxHeight: 100
    }
}), { name: 'MessageBox'});

export const MessageBox = (props: MessageBoxProps) => {
    const { className, headline, text, imageSrc } = props;
    const classes = useStyles(props);

    return (
        <Paper className={clsx(classes.root, className)} elevation={1}>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <img className={classes.image} src={imageSrc} alt='image'/>
                </Grid>
                <Grid item xs={8}>
                    <Grid item>
                        <Typography variant='subtitle1'>
                            {headline}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='caption' color='textSecondary'>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}
