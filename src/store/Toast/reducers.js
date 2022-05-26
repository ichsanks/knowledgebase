export const initialState = {
  show: false,
  autohide: true,
  message: null,
  type: 'info',
}

export const ToastReducer = (initialState, action) => {
  switch (action.type) {
    case 'TOAST_SHOW':
      return {
        ...initialState,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      }
    case 'TOAST_HIDE':
      return {
        ...initialState,
        show: false,
        type: 'info',
        message: null,
      }
    default:
      return {
        ...initialState,
        errorMessage: `Unhandled action type: ${action.type}`,
      }
  }
}
