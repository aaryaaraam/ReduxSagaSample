// __tests__/sagas.test.js
import { put, call } from 'redux-saga/effects';
import { fetchEmployees } from '../sagas';
import { FETCH_EMPLOYEES, SET_EMPLOYEES } from '../actions';

describe('fetchEmployees Saga', () => {
  const generator = fetchEmployees();

  it('should dispatch FETCH_EMPLOYEES', () => {
    expect(generator.next().value).toEqual(put({ type: FETCH_EMPLOYEES }));
  });

  it('should call the API and dispatch SET_EMPLOYEES', () => {
    const employees = [
      { id: 1, name: 'John Doe', position: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', position: 'UX Designer' },
    ];
    expect(generator.next().value).toEqual(call(fetchEmployeesApi));
    expect(generator.next(employees).value).toEqual(put({ type: SET_EMPLOYEES, payload: employees }));
  });

  it('should handle errors', () => {
    const error = new Error('Test error');
    expect(generator.throw(error).value).toEqual(console.error('Error fetching employees:', error));
  });
});
