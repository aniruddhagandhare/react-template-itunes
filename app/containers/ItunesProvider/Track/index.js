/**
 *
 * Track
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Skeleton, Alert } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectError, selectLoading, selectTrack } from '../selectors';
import { demoCreators } from '../reducer';
import saga from '../saga';
import { colors } from '@app/themes/index';
import { fonts } from '@app/themes';
import IndividualTrack from '@app/components/Track';
const TrackWrapper = styled.div`
  max-width: 80em;
  margin: 0 auto;
  padding: 1.3em;
  position: relative;
`;

const CustomLink = styled(Link)`
   && {
     ${fonts.size.small()}
     color: ${colors.primary}
   }
 `;
export function Track({ track, dispatchGetTrackById, match, error, loading }) {
  useInjectSaga({ key: 'track', saga });
  const { params } = match;
  const trackId = params.trackId;
  useEffect(() => {
    dispatchGetTrackById(trackId);
  }, [track]);
  return (
    <TrackWrapper>
      <CustomLink to="/demo">
        <T id="back_to_all_tracks" />
      </CustomLink>
      <br />
      <br />
      <Skeleton loading={loading}>{track && <IndividualTrack track={track} />}</Skeleton>
      {error && <Alert message={<T id="error" values={{ error }} />} type="error" />}
    </TrackWrapper>
  );
}

Track.propTypes = {
  track: PropTypes.object,
  dispatchGetTrackById: PropTypes.func,
  match: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  track: selectTrack(),
  error: selectError(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { getTrackById } = demoCreators;
  return {
    dispatchGetTrackById: trackId => dispatch(getTrackById(trackId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(Track);

export const TrackTest = compose(injectIntl)(Track);
