import {
  Container,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {v4 as uuidv4} from 'uuid';
import {makeStyles} from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import {StateContext, DispatchContext, DELETE_ITEM, ADD_ITEM, SET_ITEMS} from "../../context/ContextReducer";
import {useContext, useEffect} from "react";
import useFetcher from '../../hooks/useFetcher';
import AddNewItemModal from "./modals/AddNewItemModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));


const ShoppingList = () => {

  const classes = useStyles();
  const stateContext = useContext(StateContext);
  const dispatchContext = useContext(DispatchContext);

  const [items, status] = useFetcher('/api/items');

  useEffect(() => {
    if (status !== 'fetched') return;
    dispatchContext({type: SET_ITEMS, payload: items});
  }, [status]);

  const removeItem = itemId => {
    dispatchContext({type: DELETE_ITEM, payload: itemId});
  };

  const addItem = () => {
    dispatchContext({type: ADD_ITEM, payload: {id: uuidv4(), name: `${uuidv4()}`}});
  }

  return (
    <Container>

      <AddNewItemModal />

      <List aria-label="main mailbox folders">
        {stateContext.items.map((item, index) => (
          <ListItem key={index} button>
            <ListItemText primary={item.name}/>
            <CancelIcon color="secondary" onClick={() => removeItem(item.id || item._id)}/>
          </ListItem>
        ))}
      </List>

    </Container>
  );
}

export default ShoppingList;