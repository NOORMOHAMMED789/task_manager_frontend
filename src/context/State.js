const initialState = {
  toast: null
}

const actions = {
  setToast: "SET_TOAST",
}

const reducer = (state, action) => {
  const { type, data } = action;
  let res;
  switch (type) {
    case actions.setToast:
      res = { ...state, toast: data };
      break;
  }
}

export { actions, initialState, reducer };