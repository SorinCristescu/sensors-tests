import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  GET_ALL_TESTS_SUCCESS,
  GET_ALL_TESTS_FAIL,
  RUN_TEST_SUCCESS,
  RUN_TEST_FAIL,
} from './types';

export const getAllTests = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/diagnostics/tests`
    );
    dispatch({
      type: GET_ALL_TESTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_TESTS_FAIL,
    });
  }
};

export const runTest = (route, name) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/diagnostics${route}`
    );
    dispatch({
      type: RUN_TEST_SUCCESS,
      payload: response.data,
    });

    const historyJournal = localStorage.getItem('historyJournal')
      ? JSON.parse(localStorage.getItem('historyJournal'))
      : [];
    localStorage.setItem('historyJournal', JSON.stringify(historyJournal));
    const newTest = {
      id: uuidv4(),
      name,
      result: response.data.result,
      executedAt: Date.now(),
    };
    let previousHistory = JSON.parse(localStorage.getItem('historyJournal'));
    let updatedHistory = [...previousHistory, newTest];

    localStorage.setItem('historyJournal', JSON.stringify(updatedHistory));
  } catch (error) {
    console.log(error);
    dispatch({
      type: RUN_TEST_FAIL,
    });
  }
};
