import React from 'react';
import ReactDOM from 'react-dom';

//'createPortal' will take in 2 arguments. The first one is a piece of JSX that we want to display on the screen(div), and the second is a reference to the element where we want to render our portal to.
//This modal needs to be rendered in our body element instead of being deeply nested within a component. To do this, we first need to create a div inside of our hmtl file below our 'root'. Then, we need to reference that id by using a querySelector.
//'history.push' we are using history to navigate the user back to the list of streams once it has deleted a stream.
//'stopPropagation' will prevent the onclick evenet in line 11 from affecting the nested divs inside
const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.reDirect} className='ui dimmer modals visible active'>
          <div onClick={(event) => event.stopPropagation() } className='ui standard modal visible active'>
            <div className='header'>{props.title}</div>
            <div className='content'>{props.content}</div>
            <div className='actions'>{props.actions}</div>
          </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;