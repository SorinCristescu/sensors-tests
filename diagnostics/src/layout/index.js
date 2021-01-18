import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from '../components/header';
import Footer from '../components/footer';
import { Page } from '@geist-ui/react';

const Layout = (props) => {
  const { children, switchThemes, themeType } = props;
  return (
    <Page size="large">
      <Page.Header>
        <Header switchThemes={switchThemes} themeType={themeType} />
      </Page.Header>
      <Page.Content>{children}</Page.Content>
      <Page.Footer>
        <Footer />
      </Page.Footer>
    </Page>
  );
};

Layout.propTypes = {
  switchThemes: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
