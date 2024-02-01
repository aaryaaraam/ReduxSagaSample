// sagas.js
import { all, call, put, takeEvery, select} from 'redux-saga/effects';
import { FETCH_EMPLOYEES, SET_EMPLOYEES, SORT_EMPLOYEES, FILTER_EMPLOYEES, SET_EMPLOYEES_FULLIST } from './actions'; 
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
    yield put({ type: SET_EMPLOYEES_FULLIST, payload: employees.employees });
  } catch (error) {
    console.error(error.message);
  }
}
const sortEmployees = (employees, sortBy) => {
 
  if(sortBy.direction =='ASC'){
    return ([...employees.sort((a, b) => a[sortBy.value] > b[sortBy.value] ? 1 : -1 )]);
      
  }else{
    return ([...employees.sort((a, b) => a[sortBy.value] > b[sortBy.value] ? -1 : 1 )]);
  }
 
};
function* sortEmployeeList(action) {
  try {
    const { payload: sortBy } = action;
    const { employees } = yield select((state) => state); 
    //const sortedEmployees = [...employees.sort((a, b) => a[sortBy.value] > b[sortBy.value] ? 1 : -1 )];
    const sortedEmployees = sortEmployees(employees, sortBy);
    yield put({ type: SET_EMPLOYEES, payload: sortedEmployees });
  } catch (error) {
    console.error(error.message);
  }
}

function* filterEmployeeList(action) {
  try {
    const { payload: filterBy } = action;
    const { employees, employeeFulList } = yield select((state) => state); 
    //const sortedEmployees = [...employees.sort((a, b) => a[sortBy.value] > b[sortBy.value] ? 1 : -1 )];
    //const sortedEmployees = sortEmployees(employees, sortBy);
    const filterEmployeeList = (filterBy!=="")? employees.filter((employee) => employee.firstName.toLowerCase().includes(filterBy.toLowerCase())) : employeeFulList;
    yield put({ type: SET_EMPLOYEES, payload: filterEmployeeList });
  } catch (error) {
    console.error(error.message);
  }
}
function* watchFetchEmployees() {
  yield takeEvery(FETCH_EMPLOYEES, fetchEmployees);
}

function* watchSortEmployees() {
  yield takeEvery(SORT_EMPLOYEES, sortEmployeeList);
}
function* watchFilterEmployees() {
  yield takeEvery(FILTER_EMPLOYEES, filterEmployeeList);
}

export default function* rootSaga() {
  yield all([
    watchFetchEmployees(),
    watchSortEmployees(),
    watchFilterEmployees(),
    // Add more sagas as needed
  ]);
}
