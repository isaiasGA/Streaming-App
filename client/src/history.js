//We need to crate our own history component in order to re-direct our users to 'StreamList'as soon as a new stream is created. 
// 'history' this package was automatically installed when we installed react-router-DOM. It is a separate library that React-router-DOM depends upon as a dependency.
//'createBrowserHistory': It is a file imported from 'history' library
//'createHistory' a  function that will be used to create a HISTORY OBJECT

import {createBrowserHistory} from 'history';

export default createBrowserHistory();