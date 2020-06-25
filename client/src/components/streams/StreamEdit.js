import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './streamForm';

class StreamEdit extends React.Component {
  //We set up a componentDidMount so that we can fetch the particular stream that we want to edit by looking for it's ID
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

onSubmit = (formValues) => {
  // console.log(formValues)
  this.props.editStream(this.props.match.params.id, formValues)
};

  render() {
    // console.log('3.props',this.props)
    if(!this.props.stream){
      return <div>LOADING.......</div>
    } 
    return (
      <div>
        <h3>Edit a Stream</h3> 
        <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit}/>  
      </div>
       //'initialValues' is a special property within 'reduxForm' taht will be used 
       // '_.pick()' is a lodash function that will only pick the values('title', 'description') that we want to from our state object and pass them down as props to our reduxForm
    )
  }
 
};

//'mapStateToProps': It has access to 2 arguments 'state' or data from our REDUX STORE and 'ownProps' wich is the data being sent to our component via props
const mapStateToProps = (state, ownProps) => {
  // console.log('2.ownProps', ownProps)
  // console.log('1.streamReducer', state.streamReducer)
  return { stream: state.streamReducer[ownProps.match.params.id]}
}

export default connect ( mapStateToProps,
  {  fetchStream: fetchStream,
     editStream: editStream
  }
  )(StreamEdit);
