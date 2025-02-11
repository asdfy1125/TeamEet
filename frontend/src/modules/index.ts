import { combineReducers } from 'redux';
import loading from './loading';
import sample, { sampleSaga } from './sample';
import calendar, { calendarSaga } from './calendar';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import auth, { authSaga } from './auth';
import timetable from './timetable';
import time from './time';
import individual from './individual';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sample'],
};

const rootReducer = combineReducers({
  loading,
  sample,
  calendar,
  user,
  auth,
  time,
  timetable,
  individual,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([sampleSaga(), userSaga(), authSaga(), calendarSaga()]);
}
