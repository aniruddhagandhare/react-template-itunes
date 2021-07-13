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
import { Skeleton } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectTrack } from './selectors';
import { trackCreators } from './reducer';
import saga from './saga';
import { colors } from '@app/themes/index';
import { fonts } from '@app/themes';
import If from '@app/components/If';
import IndividualTrack from '@app/components/IndividualTrack';

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
export function Track({ track, dispatchGetTrackById, match }) {
  useInjectSaga({ key: 'track', saga });
  const { params } = match;
  const trackId = params.trackId;
  useEffect(() => {
    dispatchGetTrackById(trackId);
  }, []);
  return (
    <TrackWrapper>
      <CustomLink to="/demo" mb="2">
        <T id="back_to_all_tracks" />
      </CustomLink>
      <If condition={track} otherwise={<Skeleton active />}>
        <IndividualTrack track={track} showInfo={true} />
      </If>
    </TrackWrapper>
  );
}

Track.propTypes = {
  track: PropTypes.object,
  dispatchGetTrackById: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  track: selectTrack()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackById } = trackCreators;
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
