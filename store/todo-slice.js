import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  open: 0,
  closed: 0,
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    close(state) {
      state.total--;
    },
    open(state) {
      state.total++;
    },
    load(state, action) {
      state.total = action.payload.total;
      state.open = action.payload.open;
      state.closed = action.payload.closed;
      state.todos = action.payload.todos || [];
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
