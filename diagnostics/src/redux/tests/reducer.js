import {
  GET_ALL_TESTS_SUCCESS,
  GET_ALL_TESTS_FAIL,
  RUN_TEST_SUCCESS,
  RUN_TEST_FAIL,
} from './types';

const initialState = {
  loading: true,
  tests: [],
  test: null,
};

const testsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: payload,
      };
    case GET_ALL_TESTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case RUN_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: payload,
      };
    case RUN_TEST_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default testsReducer;
