import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../hooks/createRequestSaga';
import * as api from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

export type User = {
  id: string;
  pw: string;
  register: { id: string; pw: string; url: string };
  form: string;
  auth: [];
  authError: [];
  url: string;
};

type LoginOrPassword = {
  key: string;
  value: string;
};

export type IdPw = {
  id: string;
  pw: string;
  url: string;
};

const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
export const register = createAction(REGISTER, (user: IdPw) => user);
export const login = createAction(LOGIN, (user: IdPw) => user);

const registerSaga = createRequestSaga(register, api.register);
const loginSaga = createRequestSaga(login, api.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState: User = {
  id: '',
  pw: '',
  url: '',
  form: 'register',
  register: {
    id: '',
    pw: '',
    url: '',
  },
  auth: [],
  authError: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeField: (state, action: PayloadAction<LoginOrPassword>) => {
      if (action.payload.key === 'username') state.id = action.payload.value;
      else state.pw = action.payload.value;
    },
    initialForm: (state) => {
      state.id = '';
      state.pw = '';
      state.url = '';
      state.register = {
        id: '',
        pw: '',
        url: '',
      };
      state.auth = [];
      state.authError = [];
    },
    REGISTER_SUCCESS: (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
      state.authError = [];
    },
    REGISTER_FAILURE: (state, action: PayloadAction<any>) => {
      state.authError = action.payload;
      state.auth = [];
    },
    LOGIN_SUCCESS: (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
      state.authError = [];
    },
    LOGIN_FAILURE: (state, action: PayloadAction<any>) => {
      state.authError = action.payload;
      state.auth = [];
    },
  },
});

export const { changeField, initialForm, LOGIN_SUCCESS, REGISTER_SUCCESS } =
  authSlice.actions;

export default authSlice.reducer;
