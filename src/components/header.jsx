import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StartGameMenu from './startGameMenu.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgba(199, 201, 195, 0.3)', boxShadow: 'none', color: 'white'}}>
        <Toolbar>
          <Button color="inherit" >
            How to play
          </Button>
          <Typography variant="h6" className={classes.title}>
            Famous person guessing game
          </Typography>
          <StartGameMenu/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
