import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import loadOrderService, {
  getOrderDetailsById,
} from "../../service/api/orderService";
import {
  loadOrderFailure,
  loadOrderRequest,
  loadOrderSuccess,
} from "../reducers/orderReducer";
import {
  orderDetailsFailure,
  orderDetailsRequest,
  orderDetailsSuccess,
} from "../reducers/cartReducer";

function* loadAllOrderSaga(action) {
  try {
    // console.log("SAGA REQUEST => ", action.payload);

    const orders = yield call(loadOrderService, action.payload);
    yield put(loadOrderSuccess(orders));
  } catch (error) {
    yield put(loadOrderFailure(error.message));
  }
}

function* getOrderSagabyId(action) {
  try {
    const orderById = yield call(getOrderDetailsById, action.payload);
    yield put(orderDetailsSuccess(orderById));
  } catch (error) {
    yield put(orderDetailsFailure(error.message));
  }
}

export function* orderSagaWatcher() {
  yield takeLatest(loadOrderRequest, loadAllOrderSaga);
  yield takeLatest(orderDetailsRequest, getOrderSagabyId);
}
