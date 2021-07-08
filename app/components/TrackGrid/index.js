/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Card, Skeleton } from 'antd';
import * as colors from '@app/themes/colors';
import { Link } from 'react-router-dom';

import styled from 'styled-components'



const CustomText = styled.small`
  font-size: ${props => props.size}em;
  color: ${props => (props.color ? props.color : colors.text)};
  margin-bottom: 5px;
  display: block;
  width: 280px;
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
      height: 250px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .audio-control {
    }
    audio {
      width: 100%;
      margin-top: 20px;
    }
    audio::-webkit-media-controls-panel {
      background: ${colors.secondary};
    }
    audio::-webkit-media-controls-play-button{
      color: ${colors.primary}
    }

  }
`;

const GridCard = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;


function TrackGrid(
  {
    loading,
    songs
  }
) {
  return (
    <GridCard>
      <Skeleton loading={loading} active>
        {songs.map((song, idx) => {
          if (song.wrapperType === 'track') {
            return (
              <CustomCard key={idx} cover={<img alt="example" src={song.artworkUrl100} />}>
                <div className="inner-wrapper">
                  <div>
                    <CustomText color={colors.primary} size=".8">
                      {song.artistName}
                    </CustomText>
                    <CustomText size="1" title={song.collectionName}>
                      <Link to={`/track/${song.trackId ? song.trackId : song.artistId}`}>
                        {song.collectionName ? song.collectionName : 'Untitled'}
                      </Link>
                    </CustomText>
                    <CustomText size="1" color={colors.textLight}>
                      {song.primaryGenreName}
                    </CustomText>
                  </div>
                  {/* <div className="audio-control">
                    <audio controls>
                      <source src={song.previewUrl} />
                    </audio>
                  </div> */}
                </div>
              </CustomCard>
            );
          }
        })}
      </Skeleton>
    </GridCard>
  )
}

TrackGrid.propTypes = {
  loading: PropTypes.bool,
  songs: PropTypes.array
}

export default memo(TrackGrid)
