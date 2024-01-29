import { all } from "redux-saga/effects";
import { todoSaga } from "./slices/todo";
export default function* rootSaga() {
  yield all([todoSaga()]);
}
