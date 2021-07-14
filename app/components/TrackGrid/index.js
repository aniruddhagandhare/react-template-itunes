/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import For from '@components/For';
import IndividualTrack from '@components/IndividualTrack';

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
  songs: PropTypes.arrayOf(PropTypes.shape({
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
  }))
};

export default memo(TrackGrid);
