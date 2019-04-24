// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
//
// import { REQUEST_TESTING, RECEIVE_TESTING, receiveTesting } from '../uiComponents/RMA/redux/actionConsts'
//
// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* helloWorld(action) {
//   try {
//     // do api call
//     // const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({
//       type: RECEIVE_TESTING,
//       text: "Hello world from redux saga!"
//     });
//   } catch (e) {
//     yield put(receiveHelloWorld("Hello world from redux saga!"));
//   }
// }
//
// /*
//   Alternatively you may use takeLatest.
//   Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// export function* mySaga() {
//   yield takeLatest(REQUEST_TESTING, receiveTesting);
// }
//
// function* helloWorld2(action) {
//   try {
//     // do api call
//     // const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({
//       type: RECEIVE_TESTING,
//       text: "Hello world from redux saga!"
//     });
//   } catch (e) {
//     yield put(receiveHelloWorld("Hello world from redux saga!"));
//   }
// }
//
// export function* mySaga2() {
//   yield takeLatest(REQUEST_TESTING, receiveTesting);
// }
