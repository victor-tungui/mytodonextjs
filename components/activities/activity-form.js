import useInput from '../../hooks/use-input';

const activityNameValidator = (value) =>
  value.trim() !== '' && value.trim().length <= 10;

const ActivityForm = (props) => {
  const {
    value: activityNameValue,
    hasError: activityNameHasError,
    inputChangedHanlder: activityNameChangedHandler,
    inputBlurHanlder: activityNameBlurHanlder,
    isValid: activityNameIsValid,
    resetHandler: activityNameReset,
  } = useInput(activityNameValidator);

  let formIsValid = false;

  if (activityNameIsValid) {
    formIsValid = true;
  }

  const activitySubmitHandler = (event) => {
    event.preventDefault();

    if (activityNameIsValid) {
      console.log('Submit form');

      activityNameReset();
    }
  };

  return (
    <div className='container'>
      <header>
        <span className='fs-4'>New Activity</span>
      </header>

      <form
        className='form needs-validation'
        onSubmit={activitySubmitHandler}
        noValidate
      >
        <div className='row mb-3'>
          <label htmlFor='name' className='col-sm-2 col-form-label'>
            Activity Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='name'
              onChange={activityNameChangedHandler}
              onBlur={activityNameBlurHanlder}
              value={activityNameValue}
            />

            {activityNameHasError && (
              <div className='text-danger'>Please provide the Actvity Name</div>
            )}
          </div>
        </div>

        {/* <div className='row mb-3'>
          <label htmlFor='description' className='col-sm-2 col-form-label'>
            Description
          </label>
          <div class='col-sm-10'>
            <textarea className='form-control'></textarea>
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='expiration' className='col-sm-2 col-form-label'>
            Expiration
          </label>
          <div class='col-sm-10'>
            <input
              type='date'
              name='expiration'
              id='expiration'
              className='form-control'
            ></input>
          </div>
        </div> */}

        <div className='row mb-3'>
          <label
            htmlFor='expiration'
            className='col-sm-2 col-form-label'
          ></label>
          <div className='col-sm-10'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={!formIsValid}
            >
              Create Activity
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
