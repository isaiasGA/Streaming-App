import React from "react";
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions/index';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {id} =this.props.match.params;

      //When our component first render, we will try to set up our MEDIA PLAYER
    //CODE BELOW IS USED TO FETCH OUR STREAM
    this.props.fetchStream(id);
    //Code below is to set up our media player each time our component first mounts
    this.buildPlayer();
  }

  //componentDidUpdate will be called when our component successfully fetches the stream with the appropiate ID. This means that we will always try to build a player
  componentDidUpdate(){
    this.buildPlayer();
  }

  //componentWillUnmount will run after we've exited our streamShow component. IT will make some clean-up and will unmount our mediaPlayer code since we're no longer on that particular StreamShow page
  //The media player will stop trying to play any videos and will detach from video element that we have created
  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    //We will call 'buildPlayer' fi we havent build a media player yet or if we dont have a stream yet
    if(this.player || !this.props.stream) {
      return;
    } 
    //code below is for setting up our media player
    const {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

//'flv' is the video format that we want to fetch
//ul: is the vide with a specific ID that we are trying to fetch

  render(){
    if(!this.props.stream) {
      return <div>Loading......</div>
    }

    const { title, description } = this.props.stream;
  return (
  <div>
    <video ref={this.videoRef} style={{ width: '100%'}} controls={true}/>
    <h1>{title}</h1>
    <h5>{description}</h5>
  </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streamReducer[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream:fetchStream})(StreamShow);
