import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {useAppState} from '../contexts/AppState';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const AppNavbar = () => {
  const classes = useStyles();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [state] = useAppState();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={() => setIsMenuOpened(!isMenuOpened)} variant="h6" className={classes.title}>
            Shopping List: {state.shoppingItems.items.length} - {String(isMenuOpened)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;
