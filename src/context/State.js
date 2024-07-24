const initialState = {

}

const actions = {

}

const reducer = (state, action) => {
  const { type, data } = action;
  let res;
  switch (type) {
    case actions.setBrands:
      res = { ...state, brands: data.brands };
      break;
  }
}

export { actions, initialState, reducer };