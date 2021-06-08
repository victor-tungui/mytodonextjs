import mainAxios from '../library/axios/main-axios';
import { todoActions } from './todo-slice';

export const getTodosItems = (activityId, user) => {
  return async (dispatch) => {
    const getTodosUrl = `/todos?activityId=${activityId}`;

    try {
      const todosGet = await mainAxios.get(getTodosUrl, {
        headers: { Authorization: `Bearer ${user.apiToken}` },
      });

      dispatch(
        todoActions.load({
          total: 2,
          open: 2,
          closed: 0,
          todos: todosGet.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
