import './App.css';
import AppFrame from "./components/app-frame/AppFrame";
import {initialState, combineReducers} from './reducers';
import {AppStateProvider} from './contexts/AppState';
import ShoppingItemsReducer from './reducers/ShoppingItemsReducer';

const appReducers = combineReducers({
  shoppingItems: ShoppingItemsReducer,
});

const App = () => {
  return (
    <AppStateProvider reducer={appReducers} initialState={initialState}>
      <AppFrame />
    </AppStateProvider>
  );
}

export default App;
