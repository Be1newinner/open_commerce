import loadProductService from "../../service/api/productAPI/productService";

const { call, put, takeEvery } = require("redux-saga/effects");
const {
  loadAllProductSuccess,
  loadAllProductFailure,
  loadAllProductRequest,
} = require("../reducers/productReducer");

function* loadAllProductSaga(action) {
  try {
    const products = yield call(loadProductService, action.payload);
    yield put(loadAllProductSuccess(products));
  } catch (error) {
    yield put(loadAllProductFailure(error.message));
  }
}

export function* productSagaWatcher() {
  yield takeEvery(loadAllProductRequest, loadAllProductSaga);
}
