// EmployeeList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from './actions';

const EmployeeList = ({ employees, fetchEmployees }) => {
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div>
      <h1>Employee Roster</h1>
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
});

const mapDispatchToProps = {
  fetchEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
