import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTests } from '../../redux/tests/actions';

// Components
import List from '../../components/list';
import Loader from '../../components/loader';
import { Text } from '@geist-ui/react';

const Home = () => {
  const loading = useSelector((state) => state.tests.loading);
  const tests = useSelector((state) => state.tests.tests.tests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Text h3>TESTS</Text>
      <List tests={tests} />
    </>
  );
};

export default Home;
