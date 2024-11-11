// type State = {
  // username: string,
  // email: string,
  // password: string,
  // confirmPassword: string,
// }
// 
// type Action = {
  // type: string,
  // name: string,
  // value: string
// }
 
function signInFormReducer (state: any, action: any) {
  const { type, name, value } = action;

  switch (type) {
    case 'update_input':
      return { ...state, [name]: value }
    default:
      console.error('Unknown type: ', type);
  }
}

export default signInFormReducer;