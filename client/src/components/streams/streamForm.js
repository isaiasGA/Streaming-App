//streamForm will be connected to 'StreamConnect' and  'StreanEdit'. This will be a reusable components where its form will be reused by both components.


//'Filed' is a component that will be used to display content on the screen.
//'reduxForm' is a function similar to connect(), which will be used to communicate with our provider and therefore with our state
import React from "react";
import { Field, reduxForm } from "redux-form";

//'Field': It is a component that is gonna be used every time we need to get an inpur from an user. This input can be textbox, radioButton, dropdown
//Field component doesnot know how to render/display content on the screen. It only knows how to colect values from inputs and manage forms
//'component' is a property that takes in a React component or function that will be shown on the screen
//'...' A new type of syntax that will add all of the properties(onChange, value) from 'input' and it will add them to our <input /> tag. This is a new type of SYNTAX
//We then destructure 'input' in order to end up with a clean syntax
class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  
  //WEve set up this variable with meta.error and meta.touched so that we can diplasy the error message once we click in and click out of the input as well as when we dont have an input and we try to submit the form
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // console.log("meta", meta);
    // console.log('formProps',formProps);
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };


//We expect our parent component to pass down a callback called onSubmit
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    // console.log('formValues',formValues);
  }

  //'label' is a property that is not identified by the Field component, and therefore, we pass it to 'renderInput'
  //'handleSubmit' is a function that is part of redux-form. THis function already takes care of 'preventDefault' so there is no need for us to write the function out
  render() {
    // console.log('this.props',this.props)
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error" //We added a class of  'error' so that 'ui component' wont hide the 'renderError' data
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
//VALIDATION FUNCTION
//Validate is a variable that will be used to validate each of the inputs in or form/ 'formValues' will contain all of the values contain inside of our form
//errors: It is the object that will be returned in case the user does not provide us with a title or a description. If the user has provided us with a title and a description, then we will return an empty object.
//After we have set up our validate function, then we add it to our 'redux form' function below
// Validate function will be called each time our form is rendered or a user interacts with the form.
//Redux will look at each field
//If a Field component has the same name as ont of the properties within thr errors object, then the property will be passed to 'renderInput' in order to render the error as a string. This will only happen if there is an error going on of course.
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    //condition will only run if the user did not typed in a title
    errors.title = "Please provide a title";
  }
  if (!formValues.description) {
    errors.description = "Please provide a description";
  }

  return errors;
};

//'reduxForm' only recives one argument as an object
//We also need to give our form a name, as seen in our code below 'stramCreate'
//if we are using connect and reduxForm, then it would be best to wrapped our reduxForm in a variable and just pass it to our connect() function as seen below
 export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);

