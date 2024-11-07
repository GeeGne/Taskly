function signUpFormReducer (formInputs, action) {
  const { type, name, value } = action;

  switch (type) {
    case 'update_input':
      return { ...formInputs, [name]: value }
    default:
      console.error('Unknown type: ', type);
  }
}

export default signUpFormReducer;