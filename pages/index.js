function HomePage() {
  return (
    <div className='row'>
      <div className='col-md-12 text-center'>
        <h1>Welcome to my ToDo Application</h1>
        <h5>This is just a simple TODO Demo App to learn NextJS</h5>
        <p>
          Please{' '}
          <a href='/authentication/register' className='link-success'>
            Register
          </a>{' '}
          to review the app
        </p>
        <p>
          <strong>Note:</strong> I will not use the email for any purpose so
          feel free to use a valid one or fake
        </p>
      </div>
    </div>
  );
}

export default HomePage;
