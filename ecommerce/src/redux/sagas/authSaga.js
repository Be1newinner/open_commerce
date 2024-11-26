import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
} from "../reducers/authReducer";
import loginService from "../../service/api/auth/loginService";
import loadUserService from "../../service/api/auth/getUserService";

function* authLoginSaga(action) {
  try {
    const auth = yield call(loginService, action.payload);
    console.log("auth => ", auth);

    yield put(loginSuccess(auth));

    const user = yield call(loadUserService, auth.token);

    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(loginFail(error.message));
  }
}

function* getUserSaga(action) {
  try {
    const user = yield call(loadUserService, action.payload);
    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

export function* authSagaWatcher() {
  yield takeLatest(loginRequest, authLoginSaga);
  yield takeLatest(getUserRequest, getUserSaga);
}
