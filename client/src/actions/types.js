//This file will contain all of the TYPES used in both our action creators and our reducers
//We set these variables as a way of preventing typos when using the same type inside of a reducer and an action creator
//An error message will appear in case we ever end up with a typo when using these variables wrong
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_STREAM = 'CREATE_STREAM';
export const FETCH_STREAMS = 'FETCH_STREAMS';
export const FETCH_STREAM = 'FETCH_STREAM';
export const DELETE_STREAM = 'DELETE_STREAM';
export const EDIT_STREAM = 'EDIT_STREAM';