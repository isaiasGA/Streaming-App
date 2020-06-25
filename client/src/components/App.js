import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./Header";
import history from '../history';

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

//TIP: We've placed the header component outside of the <BrowserRouter> so that the component will remain in a fixed position each time we switch to a different page.

//We created a plain 'Router' so that we can use our coustomized history object. This is done in order to re-direct the user to our 'StreamList' component as soon as a new stream is created.
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};
//'exact' the exact property changes the rules used by react for choosing what paths to display on the screen
//This means that the 'extracted path' will now === be strictly compared to the path from the designated Route

//':id' is used to make our url flexible when navigating our users to a specific stream. The important thing is the colon being used :, id is just a banana word
export default App;
