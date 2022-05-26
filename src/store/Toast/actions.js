export async function toastShow(dispatch, payload, autohide = true) {
  dispatch({ type: 'TOAST_SHOW', payload })
  autohide && setTimeout(() => dispatch({ type: 'TOAST_HIDE' }), 2000)
}

export async function toastHide(dispatch) {
  dispatch({ type: 'TOAST_HIDE' })
}
