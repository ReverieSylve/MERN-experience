import {
  Container,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {useEffect, useCallback} from "react";
import AddNewItemModal from "./modals/AddNewItemModal";
import ApiCall from '../core/api-call/ApiCall';
import {useAppState} from '../../contexts/AppState';


const ShoppingList = () => {

  const [state, dispatch] = useAppState();

  const fetchItems = useCallback(async () => {
    ApiCall('/api/items').then(response => dispatch({type: 'SET_ITEMS', payload: response}))
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const removeItem = itemId => {
    const options = {
      method: 'DELETE',
    };
    ApiCall(`/api/items/${itemId}`, options).then(() => dispatch({type: 'DELETE_ITEM', payload: itemId}));
  };

  return (
    <Container>

      <AddNewItemModal/>

      <List aria-label="main mailbox folders">
        {state.shoppingItems.items.map(({name, _id}) => (
          <ListItem key={_id} button>
            <ListItemText primary={name}/>
            <CancelIcon color="secondary" onClick={() => removeItem(_id)}/>
          </ListItem>
        ))}
      </List>

    </Container>
  );
}

export default ShoppingList;