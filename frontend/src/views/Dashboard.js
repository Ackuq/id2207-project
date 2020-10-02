import React, { useContext, useMemo } from "react";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Toolbar,
  ListItemText,
} from "@material-ui/core";
import AuthContext from "../context/AuthContext";
import { viewInfo } from "../config/views";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Dashboard = ({ children }) => {
  const location = useLocation();
  const { user, handleLogout } = useContext(AuthContext);
  const classes = useStyles();

  const views = useMemo(() => user.views.map((view) => viewInfo[view]), [user]);

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <Button
            style={{ marginLeft: "auto" }}
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}></div>
        <Divider />
        <List>
          {views.map((view) => (
            <ListItem
              selected={location.pathname === view.route}
              button
              disableRipple
              key={view.title}
              component={React.forwardRef((itemProps, ref) => (
                <Link to={view.route} ref={ref} {...itemProps} />
              ))}
            >
              <ListItemText primary={view.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
