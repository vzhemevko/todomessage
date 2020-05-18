import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Box,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import useStyles from 'components/Navbar/navbarStyle';
import Board from 'components/Board/Board';
import Settings from 'components/Settings/Settings';
import { useApp } from 'hooks/useApp';

export default function TodoMsgNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logoutBoard } = useApp();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const HeaderBar = () => {
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
          >
            <MenuIcon />
          </IconButton>
          <NotificationsNoneIcon fontSize="large" />
          <Box className={classes.logo}>
            <Typography variant="h5" noWrap>
              Todomessage
            </Typography>
            <Typography variant="caption" noWrap>
              &nbsp; receive messages about things you need to do
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  const SiderBar = () => {
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Board" component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
          <ListItem button key="Settings" component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button key="Signout">
            <ListItemIcon onClick={logoutBoard}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Drawer>
    );
  };

  return (
    <Router>
      <div className={classes.root}>
        <HeaderBar />
        <SiderBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/">
            <Board />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
        </main>
      </div>
    </Router>
  );
}
