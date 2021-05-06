import useInput from '../../hooks/use-input';
import { useRouter } from 'next/router';
import {
  createActivity,
  updateActivity,
} from '../../library/activities/activities-util';

const activityNameValidator = (value) =>
  value.trim() !== '' && value.trim().length <= 50;

const descriptionValidator = (value) => value.trim() !== '';

const expirationDateValidator = (value) => {
  const currentDate = new Date();
  const givenDate = new Date(value);

  return value.trim() === '' || givenDate > currentDate;
};

const ActivityForm = (props) => {
  const router = useRouter();

  // New or Update Variables
  const isNew = props.isNew === 'true';
  const submitButtonText = isNew ? 'Create' : 'Update';
  let activity = null;

  if (props.activity && !isNew) {
    activity = { ...props.activity };
  }

  const {
    value: activityNameValue,
    hasError: activityNameHasError,
    inputChangedHanlder: activityNameChangedHandler,
    inputBlurHanlder: activityNameBlurHanlder,
    isValid: activityNameIsValid,
    resetHandler: activityNameReset,
  } = useInput(activityNameValidator, activity?.name ?? '');

  const {
    value: descriptionValue,
    hasError: descriptionHasError,
    inputChangedHanlder: descriptionChangedHanlder,
    inputBlurHanlder: descriptionBlurHandler,
    isValid: descriptionIsValid,
    resetHandler: descriptionReset,
  } = useInput(descriptionValidator, activity?.description ?? '');

  const {
    value: expirationValue,
    hasError: expirationHasError,
    inputChangedHanlder: expirationChangedHandler,
    inputBlurHanlder: expirationBlurHandler,
    isValid: expirationIsValid,
    resetHandler: expirationReset,
  } = useInput(expirationDateValidator, activity?.expiration ?? '');

  let formIsValid = false;
  let activityCss = activityNameHasError
    ? 'form-control is-invalid'
    : 'form-control';

  let descriptionCss = descriptionHasError
    ? 'form-control is-invalid'
    : 'form-control';

  let expirationCss = expirationHasError
    ? 'form-control is-invalid'
    : 'form-control';

  if (activityNameIsValid && descriptionIsValid && expirationIsValid) {
    formIsValid = true;
  }

  const activitySubmitHandler = async (event) => {
    event.preventDefault();

    if (activityNameIsValid && descriptionIsValid && expirationIsValid) {
      activityNameReset();
      descriptionReset();
      expirationReset();

      const activity = {
        name: activityNameValue,
        description: descriptionValue,
        expiration: expirationValue,
      };

      if (isNew) {
        try {
          await createActivity(props.session.user.apiToken, activity);
          router.replace('/activities');
        } catch (error) {
          console.log(error);
        }
      } else {
        updateActivity(props.session.user.apiToken, props.activity.id, activity)
          .then(() => {
            router.replace('/activities');
          })
          .catch((error) => console.log(error));
      }
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
              className={activityCss}
              id='name'
              onChange={activityNameChangedHandler}
              onBlur={activityNameBlurHanlder}
              value={activityNameValue}
              maxLength='50'
            />

            {activityNameHasError && (
              <div className='text-danger'>
                Please review the Actvity Name. It should not be empty and less
                than 50 characters
              </div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='description' className='col-sm-2 col-form-label'>
            Description
          </label>
          <div className='col-sm-10'>
            <textarea
              className={descriptionCss}
              maxLength='500'
              value={descriptionValue}
              onChange={descriptionChangedHanlder}
              onBlur={descriptionBlurHandler}
            ></textarea>
            {descriptionHasError && (
              <div className='text-danger'>
                Please review the Description. It should not be empty.
              </div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='expiration' className='col-sm-2 col-form-label'>
            Expiration
          </label>
          <div className='col-sm-10'>
            <input
              type='date'
              name='expiration'
              id='expiration'
              className={expirationCss}
              value={expirationValue}
              onChange={expirationChangedHandler}
              onBlur={expirationBlurHandler}
            ></input>

            {expirationHasError && (
              <div className='text-danger'>
                Please review the expiration date. It should be today or greater
                than today.
              </div>
            )}
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='submit' className='col-sm-2 col-form-label' />
          <div className='col-sm-10'>
            <button
              id='submit'
              type='submit'
              className='btn btn-primary'
              disabled={!formIsValid}
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
