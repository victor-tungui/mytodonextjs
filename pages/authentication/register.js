import { useState } from 'react';
import useInput from '../../hooks/use-input';
import { registerUser } from '../../library/users/register-user';

// Validations
const emailValidator = (value) => {
  const regexEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  return value.trim() !== '' && regexEmail.test(value);
};

const passwordValidator = (value) =>
  value.trim() !== '' && value.trim().length > 5;

const nameValidator = (value) => value.trim() !== '' && value.trim().length > 3;

// end validations

function RegisterPage() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const registerSubmitHandler = async (event) => {
    event.preventDefault();

    setSuccess(false);
    setError(null);

    if (
      emailIsValid &&
      password2IsValid &&
      passwordIsValid &&
      lastNameIsValid &&
      firstNameIsValid
    ) {
      try {
        const newUser = {
          email: emailValue,
          password: passwordValue,
          confirmPassword: password2Value,
          firstName: firstNameValue,
          lastName: lastNameValue,
        };

        await registerUser(newUser);
        setSuccess(true);
      } catch (error) {
        setError(error.response.data.title);
      }
    }
  };

  const {
    value: emailValue,
    hasError: emailHasError,
    inputChangedHanlder: emailChangedHanlder,
    inputBlurHanlder: emailBlurHandler,
    resetHandler: emailResetHanlder,
    isValid: emailIsValid,
  } = useInput(emailValidator, '');

  const {
    value: passwordValue,
    hasError: passwordHasError,
    inputChangedHanlder: passwordChangedHanlder,
    inputBlurHanlder: passwordBlurHandler,
    resetHandler: passwordResetHanlder,
    isValid: passwordIsValid,
  } = useInput(passwordValidator, '');

  const {
    value: password2Value,
    hasError: password2HasError,
    inputChangedHanlder: password2ChangedHanlder,
    inputBlurHanlder: password2BlurHandler,
    resetHandler: password2ResetHanlder,
    isValid: password2IsValid,
  } = useInput(passwordValidator, '');

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    inputChangedHanlder: firstNameChangedHanlder,
    inputBlurHanlder: firstNameBlurHandler,
    resetHandler: firstNameResetHanlder,
    isValid: firstNameIsValid,
  } = useInput(nameValidator, '');

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    inputChangedHanlder: lastNameChangedHanlder,
    inputBlurHanlder: lsatNameBlurHandler,
    resetHandler: lastNameResetHanlder,
    isValid: lastNameIsValid,
  } = useInput(nameValidator, '');

  let formIsValid = true;

  let errorContent = (
    <div className='alert alert-danger mt-2 text-center' role='alert'>
      Unable to register user: Details: {error}
    </div>
  );
  if (!error) {
    errorContent = null;
  }

  return (
    <div className='shadow p-5 mt-3 rounded'>
      <form onSubmit={registerSubmitHandler}>
        <p className='h3 text-center mb-3'>Register</p>
        <div className='row mb-3'>
          <label htmlFor='email' className='col-sm-2 col-form-label'>
            Email address
          </label>
          <div className='col-sm-10'>
            <input
              type='email'
              className='form-control'
              required
              id='email'
              value={emailValue}
              onChange={emailChangedHanlder}
              onBlur={emailBlurHandler}
            />

            {emailHasError && (
              <div className='text-danger'>
                Please enter a valid email address
              </div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='password' className='col-sm-2 col-form-label'>
            Password
          </label>
          <div className='col-sm-10'>
            <input
              type='password'
              className='form-control'
              required
              id='password'
              value={passwordValue}
              onChange={passwordChangedHanlder}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <div className='text-danger'>Please enter a valid password</div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='password2' className='col-sm-2 col-form-label'>
            Confirm Password
          </label>
          <div className='col-sm-10'>
            <input
              type='password'
              className='form-control'
              required
              id='password2'
              value={password2Value}
              onChange={password2ChangedHanlder}
              onBlur={password2BlurHandler}
            />
            {password2HasError && (
              <div className='text-danger'>
                Please enter a valid password confirmation
              </div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='firstName' className='col-sm-2 col-form-label'>
            First Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              required
              id='firstName'
              value={firstNameValue}
              onBlur={firstNameBlurHandler}
              onChange={firstNameChangedHanlder}
            />
            {firstNameHasError && (
              <div className='text-danger'>Please enter the First Name</div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='lastName' className='col-sm-2 col-form-label'>
            Last Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              required
              id='lastName'
              value={lastNameValue}
              onChange={lastNameChangedHanlder}
              onBlur={lsatNameBlurHandler}
            />

            {lastNameHasError && (
              <div className='text-danger'>Please enter the Last Name</div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-sm-2'></div>
          <div className='col-sm-10'>
            <button
              type='submit'
              className='btn btn-primary'
              id='register'
              disabled={!formIsValid}
            >
              Register
            </button>
          </div>
        </div>
      </form>
      {errorContent}
      {success && (
        <div className='alert alert-success mt-2 text-center'>
          You are now register. Please use yoour credentials now.{' '}
          <a href='/authenticattion' className='link-info'>
            Log In
          </a>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
