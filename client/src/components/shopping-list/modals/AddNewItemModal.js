import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useContext, useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {DispatchContext, ADD_ITEM} from "../../../context/ContextReducer";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  addItemButton: {
    marginTop: '2rem'
  }
}));

const AddNewItemModal = () => {
  const classes = useStyles();
  const dispatchContext = useContext(DispatchContext);

  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    setProductName('');
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addItem = () => {
    dispatchContext({type: ADD_ITEM, payload: {id: uuidv4(), name: productName}});
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.addItemButton}  variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='sm' fullWidth>
        <DialogTitle id="form-dialog-title">Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter item name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onInput={event => setProductName(event.target.value)}
            value={productName}
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddNewItemModal;
