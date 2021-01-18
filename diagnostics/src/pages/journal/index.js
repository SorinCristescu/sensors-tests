import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';

//Components
import { Text, Table, Spacer } from '@geist-ui/react';

const Journal = ({ themeType }) => {
  let { id } = useParams();
  let historyJournal = JSON.parse(localStorage.getItem('historyJournal'));
  let testJournal = historyJournal
    ? historyJournal.filter((sensor) =>
        sensor.name.toLowerCase().includes(id.toLowerCase())
      )
    : [];
  const convertDate = (date) => {
    return <Moment date={date} />;
  };
  const data = testJournal.map((item) => {
    return {
      date: convertDate(item.executedAt),
      result: item.result,
    };
  });

  return (
    <>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill={themeType === 'dark' ? 'white' : 'dark'}
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </Link>
      <Spacer />
      {testJournal.length === 0 ? (
        <>
          <Text h5>
            There is no data colected from sensor {id.toUpperCase()}
          </Text>
          <Text h5>Please go back and run a test on this sensor!</Text>
        </>
      ) : (
        <>
          <Text h5>Sensor: {id.toUpperCase()}</Text>
          <Table data={data}>
            <Table.Column prop="date" label="date" />
            <Table.Column prop="result" label="result" />
          </Table>
        </>
      )}
    </>
  );
};

Journal.propTypes = {
  themeType: PropTypes.string.isRequired,
};

export default Journal;
