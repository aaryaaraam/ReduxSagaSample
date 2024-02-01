// EmployeeList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, sortEmployees, filterEmployees } from './actions';

const EmployeeList = ({ employees, fetchEmployees, sortEmployees, sortBy, filterEmployees, }) => {
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div>
      <h1>Employee Roster</h1>
      <div>
        <button onClick={() => sortEmployees({value:'firstName', direction:'ASC'})}>Sort by ASC</button>
        <button onClick={() => sortEmployees({value:'firstName', direction:'DESC'})}>Sort by DSC</button>
        <button onClick={() => filterEmployees('a')}>Filter By </button>
        {/* Add more sorting options as needed */}
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} - {employee.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  sortBy: state.sortBy,
});

const mapDispatchToProps = {
  fetchEmployees,
  sortEmployees,
  filterEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
