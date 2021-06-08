import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { validateSession } from '../../library/session/session-validator';
import { getTodosItems } from '../../store/todo-actions';

const TodoPage = (props) => {
  const dispatch = useDispatch();
  const todoState = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTodosItems(props.activityId, props.session.user));
  }, [dispatch]);

  console.log(todoState);

  return (
    <table className='table table-striped table-hover'>
      <thead>
        <tr>
          <th>#</th>
          <th>Completed?</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todoState.todos &&
          todoState.todos.map((todo) => (
            <tr key={todo.id}>
              <th>1</th>
              <td>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='cbCompleted'
                  />
                  <label className='form-check-label' htmlFor='cbCompleted'>
                    Done?
                  </label>
                </div>
              </td>
              <td>{todo.name}</td>
              <td>Closed</td>
            </tr>
          ))}
      </tbody>
    </table>
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
