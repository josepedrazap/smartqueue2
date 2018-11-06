export default function authReducer(state = {}, action) {
  let token = state.token_;

  return Object.assign({}, state, { token });
}
