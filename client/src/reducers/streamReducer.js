import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM  
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload } 
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        default:
            return state;
    }
};

//'_.omit': inside of it, we need to be specific into what key we want to drop off of that 'state' object, 'action.payload'
    //There is no need to refernce an ID propertt because the 'action.payload' is the ID itself
//'_.omit' will create a NEW OBJECT with the current properties in our STATTE OBJECT, but it will OMIT the PROPERTIES within 'action.payload'