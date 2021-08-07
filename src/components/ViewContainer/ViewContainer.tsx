import React, {FunctionComponent} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Theme} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import background from './background.png';

export interface ViewContainerProps {
    className?: string;
    contentClassName?: string;
    title: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        background: `linear-gradient(to bottom, rgb(255 255 255 / 60%) 0%,rgb(255 255 255 / 60%) 100%), url(${background})`,
        height: '100%',
    },
    content: {
        padding: theme.spacing(2)
    }
}), { name: 'ViewContainer' });

export const ViewContainer: FunctionComponent<ViewContainerProps> = (props) => {
    const { className, contentClassName, children, title } = props;
    const classes = useStyles(props);

    return (
        <div className={clsx(classes.root, className)}>
            <AppBar position='static' elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={clsx(classes.content, contentClassName)}>
                {children}
            </div>
        </div>
    )

}
