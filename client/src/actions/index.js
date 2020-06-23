import streams from '../apis/streams';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};


//'createStream' an action creator that will use async syntax to make a request to '/streams' endpoint at 'localhost:3001' and we will try to add/put in all of our 'formValues' in it.

export const createStream =  formValues => async dispatch => {
 const response = await streams.post('/streams', formValues);
 console.log('response',response)
  dispatch({ type: CREATE_STREAM, payload: response.data})
};
/*   Un-simplified version of createStream Request

export const createStream = (formValues) => {
  return async (dispatch) => {
  };
};

*/
            //Action creator that will dispatch an action containing payload data with our data of posts
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data})
};


//Action creator that will fetch INDIVIDUAL streams by using their ID

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data})
};

//Action creator for EDITING A STREAM: An ID of the stream we want to edit and the UPDATE VALUE in tthe form of 'formValues' to the stream 'text' need to be provided

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data})
}

//Action creator to DELETE  a stream

export const deleteStream = (id) => async dispatch => {
   await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id })
}
