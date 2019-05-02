import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

// Utils
import pluginId from 'pluginId';

// Containers
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';

import reducer from './reducer';

class App extends React.Component {
  render() {
    return (
      <div className={pluginId}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func
};

App.propTypes = {
  history: PropTypes.object.isRequired
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = strapi.injectReducer({ key: 'global', reducer, pluginId });

export default compose(
  withReducer,
  withConnect
)(App);
