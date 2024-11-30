import { all } from "redux-saga/effects";
import { productSagaWatcher } from "./sagas/productSaga";
import { orderSagaWatcher } from "./sagas/orderSaga";
import { authSagaWatcher } from "./sagas/authSaga";

export default function* rootSaga() {
  yield all([productSagaWatcher(), orderSagaWatcher(), authSagaWatcher()]);
}
