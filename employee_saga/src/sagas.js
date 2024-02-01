// sagas.js
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_EMPLOYEES, SET_EMPLOYEES } from './actions';
import axios from 'axios';

// Replace the URL with your actual API endpoint
const apiUrl = 'http://localhost:4000/data'

// const fetchEmployeesApi = async () => {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error(`Error fetching employees: ${error.message}`);
//   }
// };
const fetchEmployeesApi = async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching employees: ${error.message}`);
    }
  };

function* fetchEmployees() {
  try {
    const employees = yield call(fetchEmployeesApi);
    yield put({ type: SET_EMPLOYEES, payload: employees.employees });
  } catch (error) {
    console.error(error.message);
  }
}

function* watchFetchEmployees() {
  yield takeEvery(FETCH_EMPLOYEES, fetchEmployees);
}

export default function* rootSaga() {
  yield all([
    watchFetchEmployees(),
    // Add more sagas as needed
  ]);
}
