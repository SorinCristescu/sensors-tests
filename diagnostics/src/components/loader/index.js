import React from 'react';

// Components
import { Spinner } from '@geist-ui/react';

const Loader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size="large" />
    </div>
  );
};

export default Loader;
