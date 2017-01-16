import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';
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
  const requiredFields = [ 'email' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

class Signin extends Component {

  handleFormSubmit({email, password}) {
    //need to do someting to log user in
    this.props.signinUser({email, password});
    //console.log(email, password);
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
          <Field name="email" component={renderTextField} label="Email"/>
        </div>
        <div className="form-group">
          <Field name="password" component={renderTextField} label="Password" type="password" />
        </div>
        <div className="btn-group">
          {this.renderAlert()}
          <RaisedButton label="Login" primary={true} type="submit" disabled={pristine || submitting} style={style} />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

 export default Signin = connect(mapStateToProps, {signinUser})(Signin);

//export default reduxForm({form: 'signin'},null,  actions)(Signin);
