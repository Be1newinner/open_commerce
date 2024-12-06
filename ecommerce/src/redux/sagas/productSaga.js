import loadProductService, {
  loadSingleProductService,
} from "../../service/api/productAPI/productService";

import { call, put, takeEvery } from "redux-saga/effects";

import {
  loadAllProductSuccess,
  loadAllProductFailure,
  loadAllProductRequest,
  loadSingleProductSuccess,
  loadSingleProductFailure,
  loadSingleProductRequest,
} from "../reducers/productReducer";

function* loadAllProductSaga(action) {
  try {
    const products = yield call(loadProductService, action.payload);
    yield put(loadAllProductSuccess(products));
  } catch (error) {
    yield put(loadAllProductFailure(error.message));
  }
}

function* loadSingleProductSaga(action) {
  try {
    const product = yield call(loadSingleProductService, action.payload);
    yield put(loadSingleProductSuccess(product));
  } catch (error) {
    yield put(loadSingleProductFailure(error.message));
  }
}

export function* productSagaWatcher() {
  yield takeEvery(loadAllProductRequest, loadAllProductSaga);
  yield takeEvery(loadSingleProductRequest, loadSingleProductSaga);
}
