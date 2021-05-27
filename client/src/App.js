import './App.css';
import './components/AppNavbar'
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/shopping-list/ShoppingList";
import ContextReducer from "./context/ContextReducer";
function App() {
  return (
    <ContextReducer>
      <AppNavbar/>
      <ShoppingList/>
    </ContextReducer>
  );
}

export default App;
