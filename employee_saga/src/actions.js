export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const SORT_EMPLOYEES = 'SORT_EMPLOYEES';
export const FILTER_EMPLOYEES = 'FILTER_EMPLOYEES';
export const SET_EMPLOYEES_FULLIST ='SET_EMPLOYEES_FULLIST';

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const setEmployeesFulList = (employees) => ({
  type: SET_EMPLOYEES_FULLIST,
  payload: employees,
});
export const sortEmployees = (sortBy) => ({
  type: SORT_EMPLOYEES,
  payload: sortBy,
});

export const filterEmployees =(filterBy) => ({
  type: FILTER_EMPLOYEES,
  payload: filterBy,
})