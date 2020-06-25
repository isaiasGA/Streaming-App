import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  //We only want to run our auth component one time whe we load up or app at the beginning so we put it in inside our componentDidMount
  componentDidMount() {
    //We used 'window' because 'gapi' is within WINDOW/GLOBAL variable inside of our browser
    //Getting the 'client:auth2' library from googleAPI takes time, so we need to set up a callback function in order to get a notification for when the library has been downloaded into 'gapi'
    //Once the auth library has been downloaded into gapi, we want to create an ASYNC request over to google's api in order to initiate our client so to do that, we pass in the clientId that we get when setting up our auth as a key value in an object property
    // 'scope' is used to specify what specific information we want to load up when we take the user through the authentication process
    //'init' will return a promise after the client library has been initialized.
    //Once the libary has been initialized an ready to go, we then run our callback function inside of  '.then()'
    // 'window.gapi.auth2.getAuthInstance();' is the code reuired in order for us to access the methods involved in: signin-in, signin out, etc
    //'Listen' is a method within "getAuthIstance().isSignedIn()". It can take in a callback function ()=> which will be invoked each time the user's AUTHENTICATION STATUS IS CHANGED
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "879831318337-qt450rrj3c6ts0nb5ukbqt6gd6lh613s.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //This function will be called each time our user's authentication changes
  //'signIn()' We are calling the signIn action creator as well as passing in the ID 'currentUser.get().getId()' from the user who just logged in to our action creator

  onAuthChange = isSignedIn => {
    // console.log("isSignedIn", isSignedIn);
    if (isSignedIn === true) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //This 'signIn' function will be passed in in a onclick event button and will only be invoked if the user is logged out
  onSignIn = () => {
    this.setState({ signIn: this.auth.signIn() });
  };

  onSignOut = () => {
    this.setState({ signOut: this.auth.signOut() });
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.authorizeReducer.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
