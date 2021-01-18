import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col, Text, Spacer } from '@geist-ui/react';
import ListItem from './listItem';

const List = ({ tests }) => {
  if (!tests.length) {
    <Text h5>There is no tests!</Text>;
  }
  return (
    <>
      {tests.map((item, index) => (
        <div key={index}>
          <Row>
            <Col>
              <Text h6>{item.category.toUpperCase()}</Text>
            </Col>
            <Col>
              <Text h6>{item.description.toUpperCase()}</Text>
            </Col>
          </Row>
          <ListItem tests={item.tests} />
          <Spacer y={3} />
        </div>
      ))}
    </>
  );
};

List.propTypes = {
  tests: PropTypes.array.isRequired,
};

export default List;
