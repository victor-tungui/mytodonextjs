import { useRef, useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

function LoginForm() {
  let emailRef = useRef();
  let passwordRef = useRef();
  const router = useRouter();

  const [loginError, setloginError] = useState(null);

  async function submitLoginHandler(event) {
    event.preventDefault();
    setloginError(null);

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    const loginResult = await signIn('credentials', {
      redirect: false,
      email: emailValue,
      password: passwordValue,
    });

    if (!loginResult.error) {
      router.replace('/activities');
    } else {
      setloginError(loginResult.error);
    }
  }

  // Display Error
  let errorContent = (
    <div className='alert alert-danger mt-2 text-center' role='alert'>
      The credentials provided are invalid!
    </div>
  );
  if (!loginError) {
    errorContent = null;
  }

  return (
    <div className='shadow p-5 mt-3 rounded'>
      <form>
        <p className='h3 text-center mb-3'>Login</p>
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
              ref={emailRef}
            />
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
              ref={passwordRef}
            />
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-sm-2'></div>
          <div className='col-sm-10'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={submitLoginHandler}
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
      {errorContent}
    </div>
  );
}

export default LoginForm;
