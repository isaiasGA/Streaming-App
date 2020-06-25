import React from "react";
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './streamForm';

class StreamCreate extends React.Component {
//'onSubmit' will only run once our form has been validated and our inputs are valid
// 'onSumit' will crate our action creator of 'onSubmit'
//our action creator 'createStream' WILL THEN make an API request of '.post' to our JSON server, then a new stream will be created
  onSubmit = formValues => {
    this.props.createStream(formValues);
    // console.log('formValues',formValues);
  }

  render() {
    // console.log('this.props',this.props)
    return (
     <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={this.onSubmit} /> 
     </div>
     //'onSubmit' props are sent to 'reduxForm' which is wrapping our 'streamForm' component
    );
  }
}

export default connect(null,{createStream: createStream})(StreamCreate)
