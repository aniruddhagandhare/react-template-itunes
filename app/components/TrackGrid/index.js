/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IndividualTrack from '../IndividualTrack/index';
import For from '@components/For';

const GridCard = styled.div`
  display: grid;
  margin-top: 2em;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5em;
`;
function TrackGrid({ songs }) {
  return (
    <For
      of={songs}
      isRow={false}
      ParentComponent={GridCard}
      renderItem={(song, idx) => <IndividualTrack track={song} key={idx} />}
    />
  );
}

TrackGrid.propTypes = {
  songs: PropTypes.array
};

export default memo(TrackGrid);
