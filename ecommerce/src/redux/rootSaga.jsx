import { all } from "redux-saga/effects";
import { productSagaWatcher } from "./sagas/productSaga";

export default function* rootSaga() {
  yield all([productSagaWatcher()]);
}
