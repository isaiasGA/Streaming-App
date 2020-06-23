import { combineReducers } from "redux";
//WE can rename imports such as our 'reducer', this was done in order to avoid confusion between the rest of the reducers
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import streamReducer from './streamReducer';

export default combineReducers({
  authorizeReducer: authReducer,
  streamReducer: streamReducer,
  form: formReducer
});

//It is very important to have the key name 'form' for our 'formReducer' as a convention note
