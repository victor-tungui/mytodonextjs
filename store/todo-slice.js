import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  open: 0,
  closed: 0,
  todos: [],
  changed: false,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    updateTodo(state, action) {
      const todo = action.payload;
      const item = state.todos.find((i) => i.id === todo.id);

      if (!item) {
        state.todos.push({
          id: todo.id,
          name: todo.name,
          status: todo.status,
        });

        if (todo.status === 1) {
          state.open = state.open + 1;
        }

        if (todo.status === 3) {
          state.closed = state.closed + 1;
        }
      } else {
        item.name = todo.name;
        item.status = todo.status;

        if (todo.status === 1) {
          state.open = state.open + 1;
          state.closed = state.closed - 1;
        }

        if (todo.status === 3) {
          state.open = state.open - 1;
          state.closed = state.closed + 1;
        }
      }

      state.total = state.todos.length;
    },
    load(state, action) {
      state.total = action.payload.total;
      state.open = action.payload.open;
      state.closed = action.payload.closed;
      state.todos = action.payload.items;
    },
    delete(state, action) {
      const todo = action.payload;
      const itemIndex = state.todos.findIndex((i) => i.id === todo.id);

      if (itemIndex > -1) {
        state.total = state.total - 1;

        if (todo.status === 3) {
          state.closed = state.closed - 1;
        }

        if (todo.status === 1) {
          state.open = state.open - 1;
        }

        state.todos.splice(itemIndex, 1);
      }
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
