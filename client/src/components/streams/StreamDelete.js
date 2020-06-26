import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import  { fetchStream, deleteStream } from '../../actions/index';

class StreamDelete extends React.Component {
  componentDidMount(){
    //Note: If you check the action creator 'fetchStream' in actions => index.js, youll see that the action is taking in an ID as an argument, so this is why we need to provide the 'this.props.match.params.id' ID of the current selected stream.
    this.props.fetchStream(this.props.match.params.id)
  }

   //We are not allowed to assign multiple elements(<butotn></button> x2) to a single variable 'actions', so this is why we need to wrap them in a REACT.FRAGMENT <>
    //This fragment will prevent the ui Semantic styles from overlapping because of the extra div
    //tho some code checkers or toolings might think of react fragments as an error so think before you use them :)
  renderActions(){
    const id = this.props.match.params.id; // => or ES15: const { id } = this.props.match.params;
    return (
    <>
      <button onClick={() => this.props.deleteStream(id)} className='ui button negative'>Delete</button>
      <Link to='/' className='ui button'>Cancel</Link>
    </>
   );
  }

  renderContent() {
    if(!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
  }

  render() {
    return (
        <Modal 
          title='Delete Stream'
          content= {this.renderContent()}
          actions={this.renderActions()}
          reDirect={() => history.push('/')}
        />
      //'actions': We are trying to CALL the 'actions' instead of REFERENCING 'renderActions'
      );
   }
};

//We want to get the stream with a specific ID out of 'streamReducer' 
const mapStateToProps = (state, ownProps) => {
  return {stream: state.streamReducer[ownProps.match.params.id]}
}


export default connect(mapStateToProps, {fetchStream:fetchStream, deleteStream:deleteStream})(StreamDelete);
