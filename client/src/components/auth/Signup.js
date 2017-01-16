import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../actions';
import {connect} from 'react-redux';

//material-ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {};
  const requiredFields = [ 'email', 'password', 'passwordConfirm' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if( values.password !== values.passwordConfirm) {
    errors.password = "Password must match";
  }
  return errors;
}

class Signup extends Component {

  handleFormSubmit(values) {
    this.props.signupUser(values);
    //console.log(values);
  }

  renderAlert() {
     if (this.props.errorMessage) {
       return (
         <div className="alert alert-danger">
           <strong>Oops!</strong> {this.props.errorMessage}
         </div>
       );
     }
   }

  render() {
    const { handleSubmit, pristine ,submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <Field name="email" type="email" component={renderTextField} label="Email"/>
        </div>
        <div className="form-group">
          <Field name="password" type="password" component={renderTextField} label="Password:"/>
        </div>
        <div className="form-group">
          <Field name="passwordConfirm" type="password" component={renderTextField} label="Confirm Password:"/>
        </div>
        <div className="btn-group">
          {this.renderAlert()}
          <RaisedButton label="Sign Up" primary={true} type="submit" disabled={pristine || submitting} style={style} />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

 export default Signup = connect(mapStateToProps, {signupUser})(Signup);
