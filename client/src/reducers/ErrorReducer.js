const ErrorReducer = (state, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case 'GET_ERRORS':
      return {
        ...state,
        errorState: {
          message: payload.message,
          status: payload.status,
          id: payload.id
        }
      };
    default:
      return {
        ...state,
        errorState: state.errorState
      };
  }
};

export default ErrorReducer;