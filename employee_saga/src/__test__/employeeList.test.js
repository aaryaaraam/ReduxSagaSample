// __tests__/EmployeeList.test.js
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import EmployeeList from '../EmployeeList';
import { fetchEmployees } from '../actions';

const mockStore = configureStore([]);

describe('EmployeeList Component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: [
        { id: 1, name: 'John Doe', position: 'Software Engineer' },
        { id: 2, name: 'Jane Smith', position: 'UX Designer' },
      ],
    });

    wrapper = shallow(<EmployeeList store={store} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('dispatches fetchEmployees action on mount', () => {
    const actions = store.getActions();
    expect(actions).toEqual([fetchEmployees()]);
  });

  it('displays employee data from the store', () => {
    expect(wrapper.props().employees).toEqual([
      { id: 1, name: 'John Doe', position: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', position: 'UX Designer' },
    ]);
  });
});
