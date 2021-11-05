import { POST_ADD, POST_REMOVE, POST_NULL, POST_UPDATE, USER_LOGIN, USER_LOGOUT } from "./actions";

const postReducer = (state, action) => {
  switch(action.type){
    case POST_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case POST_REMOVE:
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.payload)
      }
    case POST_NULL:
      return {
        ...state,
        data: []
      }
    case POST_UPDATE: 
        return {
          ...state,
          data: [],
          data: state.data.concat(action.payload)
        }
    default:
      return state
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        firstName: null,
        lastName: null,
        email: null
      }
    default:
      return state
  }
}

export { postReducer, authReducer }