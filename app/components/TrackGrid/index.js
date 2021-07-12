/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import styled from 'styled-components';
import { fonts, colors } from '@app/themes';

const CustomText = styled.small`
  font-size: ${props => (props.size === 'regular' ? fonts.size.regular() : fonts.size.small())}em;
  color: ${props => (props.color ? props.color : colors.text)};
  margin-bottom: 5px;
  display: block;
  width: 18em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  a {
    color: inherit;
  }
`;

const CustomCard = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    .inner-wrapper {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .ant-card-cover {
      height: 16em;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    audio {
      width: 100%;
      margin-top: 1.5;
    }
    audio::-webkit-media-controls-panel {
      background: ${colors.secondary};
    }
    audio::-webkit-media-controls-play-button {
      color: ${colors.primary};
    }
  }
`;

const GridCard = styled.div`
  display: grid;
  margin-top: 2em;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5em;
`;

function TrackGrid({ songs, loading }) {
  return (
    <Skeleton loading={loading} active>
      <GridCard>
        {songs.map((song, idx) => {
          if (song.wrapperType === 'track') {
            return (
              <CustomCard key={idx} cover={<img alt="example" src={song.artworkUrl100} />}>
                <div className="inner-wrapper">
                  <div>
                    <CustomText color={colors.primary} size="small">
                      <T id="artist_name" values={{ artistName: song.artistName }} />
                    </CustomText>
                    <CustomText size="regular" title={song.collectionName}>
                      <Link to={`/track/${song.trackId}`}>
                        {song.trackName ? (
                          <T id="collection_name" values={{ collectionName: song.trackName }} />
                        ) : (
                          <T id="collection_name" values={{ collectionName: song.collectionName }} />
                        )}
                      </Link>
                    </CustomText>
                    <CustomText size="regular" color={colors.textLight}>
                      {song.primaryGenreName}
                    </CustomText>
                  </div>
                </div>
              </CustomCard>
            );
          }
        })}
      </GridCard>
    </Skeleton>
  );
}

TrackGrid.propTypes = {
  loading: PropTypes.bool,
  songs: PropTypes.array
};

export default memo(TrackGrid);
