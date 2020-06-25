import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  //These buttons will be incharge of administrating each of the streams(edit & delete). THey will only show up if the user is logged in.

  //We used a LINK component with button styles so that we can take the user to an editing option for a specific stream(id) once we click on the edit button

  renderAdminButtons(stream){
    if(stream.userId === this.props.currentUserId) {
      return (
      <div className='right floated content'>
        <Link to={`/streams/edit/${stream.id}`}className='ui button primary'>Edit</Link>
        <button className='ui button negative'>Delete</button>
      </div>
      )};
  }


  //We want to place the Link button on the RIGHT-SIDE of our screen so we manually add a style property to our div in order to do so.
  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link to='/streams/new' className='ui button primary'>
           Create Stream
          </Link>
        </div>
      );
    }
  }
//In order for 'semantic UI' to style everything correctly, we need to place our 'renderAdminButtons()' method at the top of list in our 'renderList()' method
  renderList() {
    return this.props.streams.map(stream => {
      return(
        <div className='item' key={stream.id}>
          {this.renderAdminButtons(stream)}
          <i className='large middle aliged icon video' />
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    // console.log('props.streams',this.props.streams)
    return (
    <div>
      <h2>Streams</h2>
    <div className='ui celled list'>{this.renderList()}</div>
    {this.renderCreateButton()}
    </div>
    )};
};

const mapStateToProps = (state) => {
 return {
   streams: Object.values(state.streamReducer),
   currentUserId: state.authorizeReducer.userId,
   isSignedIn: state.authorizeReducer.isSignedIn
  };
};

//'Object.values': a built in JS function that will take in an object as an argument and all of the VALUES inside of the object will be pulled out and inserted into an ARRAY []. We do this so that we can use Map() with the array

export default connect(mapStateToProps, {
  fetchStreams: fetchStreams
})(StreamList);
