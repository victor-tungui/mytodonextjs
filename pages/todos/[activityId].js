import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { validateSession } from '../../library/session/session-validator';
import { getTodosItems, createTodo } from '../../store/todo-actions';
import { Fragment } from 'react';
import useInput from '../../hooks/use-input';

// Input Validator
const taskNameValidation = (value) =>
  value.trim() !== '' && value.trim().length > 3;

const TodoPage = (props) => {
  const dispatch = useDispatch();
  let todoState = useSelector((state) => state);

  const {
    value: taskNameValue,
    hasError: taskNameHasError,
    inputChangedHanlder: taskNameChangedHandler,
    inputBlurHanlder: taskNameBlurHanlder,
    isValid: taskNameIsValid,
    resetHandler: taskNameReset,
  } = useInput(taskNameValidation, '');

  useEffect(() => {
    dispatch(getTodosItems(props.activityId, props.session.user));
  }, [dispatch]);

  const taskNameKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      createOrUpdateActivity();
    }
  };

  const todoStatusChangeHandler = (event) => {
    let todo = todoState.todos.find((t) => t.id === Number(event.target.value));

    if (todo) {
      let updateTodo = { ...todo };
      updateTodo.status = event.target.checked ? 3 : 1;
      dispatch(createTodo(updateTodo, props.session.user));
    }
  };

  const addClickHandler = () => {
    createOrUpdateActivity();
  };

  const createOrUpdateActivity = () => {
    if (taskNameIsValid) {
      const activity = {
        id: 0,
        name: taskNameValue,
        description: '',
        activityId: props.activityId,
        status: 1,
      };
      dispatch(createTodo(activity, props.session.user));
      taskNameReset();
    }
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-6 mt-3'>
          <div className='mb-3'>
            <label htmlFor='todoName' className='form-label'>
              Task Name
            </label>

            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                id='todoName'
                placeholder='Go to school'
                onChange={taskNameChangedHandler}
                onBlur={taskNameBlurHanlder}
                onKeyDown={taskNameKeyDownHandler}
                value={taskNameValue}
              />
              <button
                className='btn btn-primary'
                type='button'
                id='button-addon2'
                onClick={addClickHandler}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <h5>
            Total: <span className='badge bg-primary'>{todoState.total}</span>
          </h5>
        </div>
        <div className='col-md-4'>
          <h5>
            Open: <span className='badge bg-success'>{todoState.open}</span>
          </h5>
        </div>
        <div className='col-md-4'>
          <h5>
            Closed: <span className='badge bg-danger'>{todoState.closed}</span>
          </h5>
        </div>
      </div>

      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Completed?</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todoState.todos &&
            todoState.todos.map((todo, index) => (
              <tr key={todo.id}>
                <th>{index + 1}</th>
                <td>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={todo.id}
                      defaultChecked={todo.status === 3 ? true : false}
                      id={`todo${todo.id}`}
                      onChange={todoStatusChangeHandler}
                    />
                    <label
                      className='form-check-label'
                      htmlFor={`todo${todo.id}`}
                    >
                      Done?
                    </label>
                  </div>
                </td>
                <td>{todo.name}</td>
                <td>
                  <button type='button' className='btn btn-primary'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TodoPage;

export async function getServerSideProps(context) {
  let auth = await validateSession(context.req);
  let activityId = context.params.activityId;

  if (!auth.session) {
    return auth.redirectLoggedOut;
  }

  return {
    props: {
      session: auth.session,
      activityId,
    },
  };
}
