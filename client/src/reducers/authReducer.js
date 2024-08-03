
const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
            error: null,
         };
      case 'REGISTER_SUCCESS':
         return {
            ...state,
            isLoading: false,
            user: action.payload,
            error: null,
         };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
      case 'LOGOUT':
         return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: action.payload,
         };
      case 'LOGOUT_FAIL':
         return {
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
            loaderText: action.payload
         };
      case 'UPDATE_USER_SUCCESS':
         return {
            ...state,
            user: {...state.user, ...action.payload},
            isLoading: false,
         }
      case 'ERROR':
         return {
            ...state, 
            error: action.payload,
         }
      default:
         return state;
   }
};


export default authReducer;