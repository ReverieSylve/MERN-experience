import './App.css';
import './components/AppNavbar'
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/shopping-list/ShoppingList";
import {initialState, combineReducers} from './reducers';
import {AppStateProvider} from './contexts/AppState';
import ShoppingItemsReducer from './reducers/ShoppingItemsReducer';

const appReducers = combineReducers({
  shoppingItems: ShoppingItemsReducer,
})

const App = () => {
  return (
    <AppStateProvider reducer={appReducers} initialState={initialState}>
      <AppNavbar/>
      <ShoppingList/>
    </AppStateProvider>
  );
}

export default App;
