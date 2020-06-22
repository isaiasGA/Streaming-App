import { SIGN_IN, SIGN_OUT } from "../actions/types";
//This variable is going to be our initilazier for our action creator below. We need to set up a property called 'isSignedIn' that is going to be set up or default to NULL.
//So this initial state is basically an OBJECT that has a property of null.
//It is important to set it up like this because when the app first loads up, we need to have a value of null
//We use CAPITALS to emphasize that this variable is truly constant and we should not chnage its content
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

// We are setting up a default of an empty OBJECT because we want to set up anoter property regarding authentication and not just a boolean, so therefore, an object is the best way to organize all of this data
//To MODIFY/UPDATE state, we need to use a spread operator ... as seen below
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

//NOTE: the first time our application is called, our reducer is called in orderto initilize our state.
