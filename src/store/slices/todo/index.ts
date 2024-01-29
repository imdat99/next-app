import { call, put, takeLatest } from "redux-saga/effects";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
// src/features/todo/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface AddTodoAsync {
  apiUrl: string;
  pageSize: number;
  pageIndex: number;
}
export interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
export const namespace = "todo";
export const addTodoAsync = createAction<AddTodoAsync>("todo/addTodoAsync");

const initialState: {
  todos: Todo[];
  status: string;
} = {
  todos: [],
  status: "idle",
};

export const todoSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = [...state.todos, ...action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export const todoStore = (state: RootState) => state[namespace];

export default todoSlice.reducer;

function* addTodoSaga(action: PayloadAction<any>) {
  const data: Todo[] = yield call(async (params: AddTodoAsync) => {
    const url = new URL(params.apiUrl);
    url.search = new URLSearchParams({
      _limit: String(params.pageSize),
      _page: String(params.pageIndex),
    }).toString();
    const res: Todo[] = await fetch(url).then((r) => r.json());
    return res;
  }, action.payload);
  yield put(addTodo(data));
}

export function* todoSaga() {
  yield takeLatest(addTodoAsync, addTodoSaga);
}

// rest of the code
