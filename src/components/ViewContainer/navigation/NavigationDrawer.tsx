import React from 'react';
import {
    Drawer,
    DrawerProps,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
} from '@material-ui/core';
import { Home as HomeIcon, Settings as SettingsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles<Theme>(
    (theme) => ({
        paper: {
            backgroundColor: theme.palette.primary.main,
            '& *': {
                color: theme.palette.common.white,
            },
        },
    }),
    { name: 'NavigationDrawer' }
);

export const NavigationDrawer = (props: DrawerProps) => {
    const classes = useStyles(props);
    return (
        <Drawer classes={{ paper: classes.paper }} {...props}>
            <List>
                <ListItem button component={Link} to='/'>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Startseite' />
                </ListItem>
                <ListItem button component={Link} to='/settings'>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Einstellungen' />
                </ListItem>
            </List>
        </Drawer>
    );
};
