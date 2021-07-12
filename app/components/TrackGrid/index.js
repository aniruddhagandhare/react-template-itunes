/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IndividualTrack from '../IndividualTrack/index';

const GridCard = styled.div`
  display: grid;
  margin-top: 2em;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5em;
`;

function TrackGrid({ songs }) {
  return (
    <GridCard>
      {songs.map((song, idx) => {
        return <IndividualTrack track={song} key={idx} />;
      })}
    </GridCard>
  );
}

TrackGrid.propTypes = {
  loading: PropTypes.bool,
  songs: PropTypes.array
};

export default memo(TrackGrid);
