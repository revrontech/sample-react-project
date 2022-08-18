import {
  call, fork, put, takeEvery, all
} from 'redux-saga/effects';
import history from '../../utils/history';
import {
  LOGIN_REQUEST,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
  PASSWORD_FORGET_REQUEST,
} from '../constants/authConstants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  loginWithEmailSuccess,
  loginWithEmailFailure,
  syncUser,
  registerWithEmailSuccess,
  registerWithEmailFailure,
  createUserSuccess,
  createUserFailure,
  passwordForgetSuccess,
  passwordForgetFailure,
} from '../actions/authActions';
import { getSelf, login } from '../../api/services/users';
import { clearAuth, setAuth } from '../../api/services/apiClient';

function getUrlVars() {
  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

function* syncUserSaga() {
  const { user } = yield call(getSelf);
  if (user) {
    yield put(syncUser(user));
  } else {
    yield put(syncUser(null));
  }
}

function* loginSaga(provider) {
  try {
    const data = yield call(() => { }, provider.payload.authProvider);
    yield put(loginSuccess(data));
    if (getUrlVars().next) {
      // Redirect to next route
      yield history.push(getUrlVars().next);
    } else {
      // Redirect to dashboard if no next parameter
      yield history.push('/app');
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginWithEmailSaga(payload) {
  try {
    const { user, message } = yield call(login, payload.email, payload.password);
    if (user) {
      yield put(loginWithEmailSuccess(user));
      yield call(setAuth, user.auth_key);
      yield syncUserSaga();
      if (getUrlVars().next) {
        // Redirect to next route
        yield history.push(getUrlVars().next);
      } else {
        // Redirect to dashboard if no next parameter
        yield history.push('/app');
      }
    } else {
      yield put(loginWithEmailFailure(message));
    }
  } catch (error) {
    yield put(loginWithEmailFailure(error));
  }
}

function* registerWithEmailSaga(payload) {
  try {
    yield call(() => { }, payload.email, payload.password);
    const dataWithName = yield call(() => { }, {
      displayName: payload.name,
    });
    yield put(registerWithEmailSuccess(dataWithName));
    // Redirect to dashboard
    yield history.push('/app');
  } catch (error) {
    yield put(registerWithEmailFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield call(clearAuth);
    yield put(syncUser(null));
    yield put(logoutSuccess());
    // Redirect to home
    yield history.replace('/');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* createUserSaga({ credential }) {
  try {
    yield call(() => { }, 'user', {
      email: credential.email,
      displayName: credential.displayName,
      creationTime: credential.metadata.creationTime,
    });
    yield put(createUserSuccess(credential));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* passwordForgetSaga({ email }) {
  try {
    yield call(() => { }, email);
    yield put(passwordForgetSuccess());
  } catch (error) {
    yield put(passwordForgetFailure(error));
  }
}


//= ====================================
//  WATCHERS
//-------------------------------------

function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGIN_WITH_EMAIL_REQUEST, loginWithEmailSaga),
    takeEvery(REGISTER_WITH_EMAIL_REQUEST, registerWithEmailSaga),
    takeEvery(REGISTER_WITH_EMAIL_SUCCESS, createUserSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
    takeEvery(PASSWORD_FORGET_REQUEST, passwordForgetSaga)
  ]);
}

const authSagas = [
  fork(loginRootSaga),
];

export default authSagas;
