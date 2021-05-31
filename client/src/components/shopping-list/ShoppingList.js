import {
  Container,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {StateContext, DispatchContext, DELETE_ITEM, SET_ITEMS} from "../../context/ContextReducer";
import {useContext, useEffect} from "react";
import AddNewItemModal from "./modals/AddNewItemModal";
import ApiCall from '../core/api-call/ApiCall';


const ShoppingList = () => {

  const stateContext = useContext(StateContext);
  const dispatchContext = useContext(DispatchContext);


  useEffect(() => {
    ApiCall('/api/items').then(response => dispatchContext({type: SET_ITEMS, payload: response}));
  }, []);

  const removeItem = itemId => {
    const options = {
      method: 'DELETE',
    };
    ApiCall(`/api/items/${itemId}`, options).then(() => dispatchContext({type: DELETE_ITEM, payload: itemId}));
  };

  return (
    <Container>

      <AddNewItemModal/>

      <List aria-label="main mailbox folders">
        {stateContext.items.map(({name, _id}) => (
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