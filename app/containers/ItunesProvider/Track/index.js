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
import { fonts, colors } from '@app/themes';
import { selectError, selectLoading, selectTrack } from '../selectors';
import saga from '../saga';
import { itunesCreators } from '../reducer';

const TrackWrapper = styled.div`
  max-width: 80em;
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
export function Track({ track, dispatchGetTrackById, match, error, loading }) {
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
    </TrackWrapper>
  );
}

Track.propTypes = {
  track: PropTypes.shape({
    kind: PropTypes.string,
    artistId: PropTypes.number,
    collectionId: PropTypes.number,
    trackId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    trackName: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    trackCensoredName: PropTypes.string,
    artistViewUrl: PropTypes.String,
    collectionViewUrl: PropTypes.string,
    trackViewUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionProce: PropTypes.number,
    trackPrice: PropTypes.number,
    collectionExplicitness: PropTypes.string,
    trackExplicitness: PropTypes.string,
    discCount: PropTypes.number,
    trackCount: PropTypes.number,
    trackNumber: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    country: PropTypes.string,
    currency: PropTypes.string,
    primaryGenre: PropTypes.string
  }),
  dispatchGetTrackById: PropTypes.func,
  match: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  track: selectTrack(),
  error: selectError(),
  loading: selectLoading()
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
