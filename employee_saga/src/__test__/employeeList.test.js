// __tests__/EmployeeList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Optional, for additional matchers
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmployeeList from '../EmployeeList';
import { fetchEmployees, sortEmployees, filterEmployees } from '../actions';

const mockStore = configureStore([]);

describe('EmployeeList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: [
        { id: 1, name: 'John Doe', position: 'Software Engineer' },
        { id: 2, name: 'Jane Smith', position: 'UX Designer' },
      ],
      sortBy: null,
      searchTerm: '',
    });

    store.dispatch = jest.fn(); // Mock the dispatch function
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
    expect(screen.getByText('Employee Roster')).toBeInTheDocument();
  });

  it('dispatches fetchEmployees action on mount', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalledWith(fetchEmployees());
  });

  it('updates search input value on change', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search by name or position');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(searchInput.value).toBe('John');
  });

  it('dispatches filterEmployees action on search button click', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search by name or position');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'John' } });
    fireEvent.click(searchButton);

    expect(store.dispatch).toHaveBeenCalledWith(filterEmployees('John'));
  });

  it('dispatches sortEmployees action on sort button click', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const sortButton = screen.getByText('Sort by Name');
    fireEvent.click(sortButton);

    expect(store.dispatch).toHaveBeenCalledWith(sortEmployees('name'));
  });
});
