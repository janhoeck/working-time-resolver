import React, { FunctionComponent, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Theme,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import background from './background.png';
import { NavigationDrawer } from './navigation/NavigationDrawer';

const useStyles = makeStyles<Theme>(
    (theme) => ({
        root: {
            background: `linear-gradient(to bottom, rgb(255 255 255 / 60%) 0%,rgb(255 255 255 / 60%) 100%), url(${background})`,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            flexGrow: 1,
        },
        content: {
            flex: 1,
            padding: theme.spacing(2),
            overflow: 'auto',
        },
    }),
    { name: 'ViewContainer' }
);

export interface ViewContainerProps {
    className?: string;
    contentClassName?: string;
    title: string;
    action?: React.ReactElement;
}

export const ViewContainer: FunctionComponent<ViewContainerProps> = (props) => {
    const {
        className,
        contentClassName,
        children,
        title,
        action = null,
    } = props;
    const classes = useStyles(props);

    const [isNavigationOpen, setNavigationOpen] = useState(false);

    const openNavigation = () => setNavigationOpen(true);
    const closeNavigation = () => setNavigationOpen(false);

    return (
        <div className={clsx(classes.root, className)}>
            <AppBar position='static' elevation={0}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={openNavigation}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant='h6'>
                        {title}
                    </Typography>
                    {action}
                </Toolbar>
            </AppBar>
            <div className={clsx(classes.content, contentClassName)}>
                {children}
            </div>
            <NavigationDrawer
                open={isNavigationOpen}
                onClose={closeNavigation}
            />
        </div>
    );
};
