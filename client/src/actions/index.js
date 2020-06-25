import streams from '../apis/streams';
import history from '../history';
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
//We are passing 'getState' as an argument because we need to have access to the ID within the 'authorizeReducer' reducer.
//WE have to first DESTRUCTORIZE {userId} and assigned it to 'getState().authorizeReducer'
//Each time we create a new stream, we will crate a new object with the old state, and we will pass in the 'userId' was well

export const createStream =  formValues => async (dispatch, getState) => {
  const { userId } = getState().authorizeReducer;
 const response = await streams.post('/streams', {...formValues, userId});

//  console.log('response',response)
  dispatch({ type: CREATE_STREAM, payload: response.data})
  //We want to do PROGRAMATIC NAVIGATION to get the user back to the root route where all of the streams are displayed in a list.
  //We will use 'history.push('/')' to navigate the user to our streamList component when a stream has been succesfully created
   history.push('/')
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
//Patch will allow us to only edit the properties that we want and the rest will not be deleted.
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data});
  history.push('/');
}

//Action creator to DELETE  a stream

export const deleteStream = (id) => async dispatch => {
   await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id })
}
