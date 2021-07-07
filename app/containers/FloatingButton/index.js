/**
 *
 * FloatingButton
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectFloatingButton from './selectors';
import saga from './saga';

export function FloatingButton() {
  useInjectSaga({ key: 'floatingButton', saga });

  return (
    <div>
      <Helmet>
        <title>FloatingButton</title>
        <meta name="description" content="Description of FloatingButton" />
      </Helmet>
      <T id={'New Button'} />
    </div>
  );
}

FloatingButton.propTypes = {};

const mapStateToProps = createStructuredSelector({
  floatingButton: makeSelectFloatingButton()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(FloatingButton);

export const FloatingButtonTest = compose(injectIntl)(FloatingButton);
