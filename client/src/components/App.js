import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

//TIP: We've placed the header component outside of the <BrowserRouter> so that the component will remain in a fixed position each time we switch to a different page.
const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit" component={StreamEdit} />
          <Route path="/streams/delete" component={StreamDelete} />
          <Route path="/streams/show" component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};
//'exact' the exact property changes the rules used by react for choosing what paths to display on the screen
//This means that the 'extracted path' will now === be strictly compared to the path from the designated Route

export default App;
