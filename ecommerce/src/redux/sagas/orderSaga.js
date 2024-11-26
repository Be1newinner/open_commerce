import { call, put, takeEvery } from "redux-saga/effects";
import loadOrderService from "../../service/api/orderService";
import {
  loadOrderFailure,
  loadOrderRequest,
  loadOrderSuccess,
} from "../reducers/orderReducer";

function* loadAllOrderSaga(action) {
  try {
    // console.log("SAGA REQUEST => ", action.payload);

    const orders = yield call(loadOrderService, action.payload);
    yield put(loadOrderSuccess(orders));
  } catch (error) {
    yield put(loadOrderFailure(error.message));
  }
}

export function* orderSagaWatcher() {
  yield takeEvery(loadOrderRequest, loadAllOrderSaga);
}
