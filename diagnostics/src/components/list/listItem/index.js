import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { runTest } from '../../../redux/tests/actions';

// Components
import { Table, Button, Link, Badge, Tooltip } from '@geist-ui/react';

const ListItem = ({ tests }) => {
  const performedTests = JSON.parse(localStorage.getItem('historyJournal'));
  const [updatedTests, setTests] = useState(performedTests);
  const loading = useSelector((state) => state.tests.loading);
  const dispatch = useDispatch();
  const handleClick = async (route, name) => {
    await dispatch(runTest(route, name));
    setTests(JSON.parse(localStorage.getItem('historyJournal')));
  };
  const operation = (route, name) => {
    const performedTest = updatedTests
      ? updatedTests.filter((test) => test.name === name)
      : [];
    return (
      <Badge.Anchor>
        <Badge size="mini" type="success">
          <Tooltip
            text={`You executed ${
              performedTest
                ? performedTest.length
                : 'There is no test executed. Please run a test!'
            } tests. If you want to see it, please check in history journal!`}
          >
            {performedTest.length}
          </Tooltip>
        </Badge>

        <Button
          type="success"
          ghost
          auto
          size="mini"
          loading={loading}
          onClick={() => handleClick(route, name)}
        >
          Run test
        </Button>
      </Badge.Anchor>
    );
  };
  const link = (name) => {
    return <Link href={`/${name.toLowerCase()}`}>See history journal</Link>;
  };

  const lastResult = (name) => {
    const performedTest = updatedTests
      ? updatedTests.filter((test) => test.name === name)
      : [];
    const lastResult =
      performedTest.length > 0 &&
      performedTest[performedTest.length - 1].result;

    return lastResult;
  };

  const data = tests.map((item) => {
    return {
      name: item.name,
      link: link(item.name),
      operation: operation(item.route, item.name),
      result: lastResult(item.name),
    };
  });

  return (
    <Table data={data} emptyText="no test">
      <Table.Column prop="name" label="test" />
      <Table.Column prop="operation" label="operation" />
      <Table.Column prop="result" label="result" />
      <Table.Column prop="link" label="history journal" />
    </Table>
  );
};

ListItem.propTypes = {
  tests: PropTypes.array.isRequired,
};

export default ListItem;
