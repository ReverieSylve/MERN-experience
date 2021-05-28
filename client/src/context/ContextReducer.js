import {createContext, useReducer} from "react";

export const DispatchContext = createContext();
export const StateContext = createContext();
export const GET_ITEMS = 'GET_ITEMS';
export const SET_ITEMS = 'SET_ITEMS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

const initialState = {
  items: [],
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS':
      return {...state};
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default: throw new Error()
  }
};

export default function ContextReducer(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};
