import { SET_EMPLOYEES, SORT_EMPLOYEES, FILTER_EMPLOYEES, SET_EMPLOYEES_FULLIST } from './actions';

const initialState = {
  employees: [],
  employeeFulList: [],
  sortBy: { value: null, direction: 'ASC' },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case SET_EMPLOYEES_FULLIST:
      return {
        ...state,
        employeeFulList: action.payload,
      };
    case SORT_EMPLOYEES:
      return {
        ...state,
        sortBy: action.payload,
      };
    case FILTER_EMPLOYEES:
      return {
        ...state,
        filterBy: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
