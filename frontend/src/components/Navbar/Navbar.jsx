import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import useStyles from 'components/Navbar/navbarStyle';
import Board from 'components/Board/Board';
import Settings from 'components/Settings/Settings';
import About from 'components/About/About';
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
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Grid item xs={8} sm={10}>
              <Typography variant="h5" noWrap>
                Todomessage
              </Typography>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Typography noWrap>
                &nbsp; receive messages about things you need to do
              </Typography>
            </Grid>
          </Grid>
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
          <ListItem button key="Signout" onClick={logoutBoard}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
          <ListItem button key="About" component={Link} to="/about">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    );
  };

  return (
    <Router>
      <div className={classes.root}>
        <HeaderBar />
        <Grid container direction="row" justify="flex-start">
          <Grid item xs={2}>
            <SiderBar />
          </Grid>
          <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route exact path="/">
                <Board />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </main>
          </Grid>
          <Grid item xs={false} sm={false} md={2} lg={2} xl={2}>
            <Typography>&nbsp;</Typography>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}
