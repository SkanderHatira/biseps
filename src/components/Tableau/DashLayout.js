import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { mainListItems, secondaryListItems } from "./listItems";
import { useAuth } from "../../hooks/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { useConfig } from "../../hooks/useConfig";
import Alert from "@material-ui/lab/Alert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import { useDownloads } from "../../hooks/useDownloads";
const { shell } = window.require("electron");

const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const bisepsTemp = path.join(homedir, ".biseps", "tmp");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        onClick={() =>
          shell.openExternal(
            "https://forgemia.inra.fr/skander.hatira/bisepsgui"
          )
        }
      >
        Biseps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const DashLayout = ({ Filling }) => {
  const classes = useStyles();
  const { cache, setCache } = useDownloads();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const auth = useAuth();
  const { openDrawer, setOpenDrawer } = useConfig();
  useEffect(() => {
    fs.access(bisepsTemp, function (error) {
      if (!error) {
        fs.stat(bisepsTemp, (err, stats) => {
          if (err) {
            console.error(err);
          }
          // we have access to the file stats in `stats`
          setCache((stats.size / 1e9).toFixed(2));
        });
      } else {
        console.log("cache is empty");
      }
    });
  }, []);
  const clearCache = () => {
    fs.rmdirSync(bisepsTemp, {
      recursive: true,
    });
    setCache(0);
  };
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          {auth.user.isAuthenticated ? (
            <>
              {/* <IconButton component={Link} to="/docs" color="inherit">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Docs
                </Typography>

                <LibraryBooksIcon />
              </IconButton> */}

              <IconButton onClick={handleClick} color="inherit">
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Account
                </Typography>
                <AccountCircleIcon />
              </IconButton>

              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem component={Link} to="/profile">
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Edit Profile </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/machines">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    Manage Remote Machines
                  </Typography>
                </MenuItem>

                <MenuItem onClick={auth.signout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Logout </Typography>
                </MenuItem>
                <MenuItem onClick={clearCache} to="/profile">
                  <ListItemIcon>
                    <DeleteForeverIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    Flush cache : {cache} Gb{" "}
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            ""
          )}
        </Toolbar>
        {sessionStorage.Platform == "linux" ? (
          ""
        ) : (
          <Alert severity="warning">
            Pipeline execution is only supported on linux systems. You can,
            however, add remote linux machines to execute your pipeline onto and
            access data locally
          </Alert>
        )}
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose
          ),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Filling
          Copyright={Copyright}
          classes={classes}
          fixedHeightPaper={fixedHeightPaper}
        />
      </main>
    </div>
  );
};
export default DashLayout;
