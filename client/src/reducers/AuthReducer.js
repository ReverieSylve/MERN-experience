const AuthReducer = (state, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case 'USER_LOADING':
      return {
        ...state,
        authState: {
          ...state.authState,
          isLoading: true
        }
      };
      case 'USER_LOADED':
      return {
        ...state,
        authState: {
          ...state.authState,
          isAuthenticated: true,
          isLoading: false,
          user: payload
        }
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        authState: {
          ...state.authState,
          ...payload,
          isAuthenticated: true,
          isLoading: false,
        }
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
    default:
      return {
        ...state,
        authState: {
          token: null,
          isAuthenticated: false,
          isLoading: false,
          user: null
        }
      };
  }
};

export default AuthReducer;