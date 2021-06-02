import AppNavbar from "../../components/AppNavbar";
import ShoppingList from "../../components/shopping-list/ShoppingList";
import ApiCall from '../core/api-call/ApiCall';
import {useAppState} from '../../contexts/AppState';

const AppFrame = () => {
  const [state, dispatch] = useAppState();

  return (
    <>
      <AppNavbar/>
      <ShoppingList/>
    </>
  );
}

export default AppFrame;