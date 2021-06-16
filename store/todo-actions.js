import mainAxios from '../library/axios/main-axios';
import { todoActions } from './todo-slice';

export const getTodosItems = (activityId, user) => {
  return async (dispatch) => {
    const getTodosUrl = `/todos?activityId=${activityId}`;
    const header = { Authorization: `Bearer ${user.apiToken}` };

    try {
      const todosGet = await mainAxios.get(getTodosUrl, {
        headers: header,
      });

      dispatch(todoActions.load(todosGet.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTodo = (activity, user) => {
  return async (dispatch) => {
    const pushTodo = async () => {
      const header = { Authorization: `Bearer ${user.apiToken}` };

      let saveTodoUrl = `/todos`;
      let pushResult = null;
      if (activity.id > 0) {
        saveTodoUrl = `${saveTodoUrl}/${activity.id}`;

        pushResult = await mainAxios.put(saveTodoUrl, activity, {
          headers: header,
        });

        return pushResult.data;
      }

      pushResult = await mainAxios.post(saveTodoUrl, activity, {
        headers: header,
      });

      return pushResult.data;
    };

    try {
      const activityUpdated = await pushTodo();
      activity.id = activityUpdated.id;

      dispatch(todoActions.updateTodo(activity));
    } catch (error) {
      console.log(error);
    }
  };
};
