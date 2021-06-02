const initialState = {
  shoppingItems: {
    items: [],
    loading: false
  },
  errorState: {
    message: {},
    status: null,
    id: null
  },
  authState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
  }
};

const combineReducers = reducers => {
  return (state, action) => {
    return Object.keys(reducers).reduce(
      (acc, prop) => {
        return ({
          ...acc,
          ...reducers[prop]({[prop]: acc[prop]}, action),
        })
      },
      state
    )
  }
};

export {initialState, combineReducers};