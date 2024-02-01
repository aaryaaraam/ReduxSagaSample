// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import EmployeeList from './EmployeeList';

const App = () => {
  return (
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  );
};

export default App;
