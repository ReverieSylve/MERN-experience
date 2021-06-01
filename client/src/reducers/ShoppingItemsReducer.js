const ShoppingItemsReducer = (state, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_ITEMS':
      return {
        ...state,
        shoppingItems: {...state.shoppingItems, items: payload}
      };
    case 'DELETE_ITEM':
      debugger;
      return {
        ...state,
        shoppingItems: {...state.shoppingItems, items: state.shoppingItems.items.filter(item => item._id !== payload)}
      };
    case 'ADD_ITEM':
      return {
        ...state,
        shoppingItems: {...state.shoppingItems, items: [...state.shoppingItems.items, payload]}
      };
    default:
      throw new Error()
  }
}

export default ShoppingItemsReducer;