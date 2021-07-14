/**
 *
 * Track
 *
 */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Skeleton, Alert } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import T from '@app/components/T';
import If from '@app/components/If';
import IndividualTrack from '@app/components/IndividualTrack';
import TrackGrid from '@app/components/TrackGrid';
import { fonts, colors } from '@app/themes';
import PropTypeContants from '@app/utils/PropTypeContants';
import { selectError, selectLoading, selectSongs, selectTrack } from '../selectors';
import saga from '../saga';
import { itunesCreators } from '../reducer';
import { isEmpty } from 'lodash';

const TrackWrapper = styled.div`
  max-width: 50em;
  margin: 0 auto;
  padding: 1.3em;
  position: relative;
`;
const CustomLink = styled(Link)`
  && {
    ${fonts.size.small()};
    color: ${colors.primary};
    display: block;
    margin-bottom: ${props => (props.mb ? `${props.mb}em` : 0)};
  }
`;
const StyledT = styled(T)`
  margin-top: 2em;
`;
export function Track({ track, dispatchGetTrackById, match, error, loading, songs }) {
  useInjectSaga({ key: 'track', saga });
  const { params } = match;
  const trackId = params.trackId;
  useEffect(() => {
    dispatchGetTrackById(trackId);
  }, []);
  return (
    <TrackWrapper>
      <CustomLink to="/" mb="2">
        <T id="back_to_all_tracks" />
      </CustomLink>
      <If condition={track} otherwise={<Skeleton loading={loading} active />}>
        <IndividualTrack track={track} showInfo={true} />
      </If>
      <If condition={error}>
        <Alert message={<T id="track_error" values={{ error }} />} type="error" />
      </If>
      <If condition={!isEmpty(songs)}>
        <StyledT type="subheading" id="more_tracks" />
        <TrackGrid songs={songs} />
      </If>
    </TrackWrapper>
  );
}

Track.propTypes = {
  track: PropTypes.shape(PropTypeContants),
  dispatchGetTrackById: PropTypes.func,
  match: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.shape(PropTypeContants))
};

const mapStateToProps = createStructuredSelector({
  track: selectTrack(),
  error: selectError(),
  loading: selectLoading(),
  songs: selectSongs()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackById } = itunesCreators;
  return {
    dispatchGetTrackById: trackId => dispatch(requestGetTrackById(trackId))
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
