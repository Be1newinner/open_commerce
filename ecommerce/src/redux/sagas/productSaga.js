import loadProductService, {
  loadSingleProductService,
} from "../../service/api/productAPI/productService";

const { call, put, takeEvery } = require("redux-saga/effects");
const {
  loadAllProductSuccess,
  loadAllProductFailure,
  loadAllProductRequest,
  loadSingleProductSuccess,
  loadSingleProductFailure,
  loadSingleProductRequest,
} = require("../reducers/productReducer");

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
