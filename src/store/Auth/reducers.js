export const initialState = {
  token: null,
  userinfo: null,
  globaldata: null,
  loading: false,
  intializing: false,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        userinfo: action.payload.userinfo,
        globaldata: action.payload.globaldata,
        token: action.payload.token,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        userinfo: null,
        token: null,
        loading: false,
      }
    case 'RESTORE_DATA':
      return {
        ...initialState,
        initializing: true,
        loading: true,
      }
    case 'RESTORE_DATA_SUCCESS':
      return {
        ...initialState,
        userinfo: action.payload.userinfo,
        globaldata: action.payload.globaldata,
        token: action.payload.token,
        initializing: false,
        loading: false,
      }
    case 'LOADING_COMPLETE':
      return {
        ...initialState,
        loading: false,
      }
    default:
      return {
        ...initialState,
        errorMessage: `Unhandled action type: ${action.type}`,
      }
  }
}
