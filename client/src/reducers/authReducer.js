
const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
            error: null,
         };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
      case 'LOGOUT':
         localStorage.removeItem('token');
         return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: action.payload,
         };
      case 'CLEAR_ERROR':
         return {
            ...state,
            error: null,
         };
      case 'LOADING':
         return {
            ...state,
            isLoading: true,
         };
      default:
         return state;
   }
};


export default authReducer;