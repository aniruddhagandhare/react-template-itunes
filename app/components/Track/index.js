/**
 *
 * Track
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import { PauseOutlined, CaretRightFilled } from '@ant-design/icons';
import { colors, media } from '@app/themes';

import { FormattedMessage as T } from 'react-intl';

const CustomCard = styled.div`
  display: grid;
  ${media.mobile.min(`
     grid-template-columns: 10em 1fr;
   `)}
  gap: 1.4em;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  div.inner-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    audio {
      width: 100%;
    }
  }
`;
const AudioButton = styled.div`
  height: 3.5em;
  width: 3.5em;
  border-radius: 3.5em;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    height: 1.4em;
    width: 1.4em;
  }
`;

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Slider = styled.div`
  margin-left: 1em;
  border-radius: 1em;
  height: 0.3em;
  background: ${colors.primary};
`;
const { Text } = Typography;

function Track({ track }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const currentTimeRef = useRef(null);

  const togglePlayState = () => {
    if (!playing) {
      setPlaying(!playing);
      audioRef.current.play();
    } else {
      setPlaying(!playing);
      audioRef.current.pause();
    }
  };
  audioRef &&
    audioRef.current &&
    audioRef.current.addEventListener(
      'timeupdate',
      e => (currentTimeRef.current.style.width = (audioRef.current.currentTime / audioRef.current.duration) * 100 + '%')
    );
  return (
    <Card
      title={
        <div>
          <T id="track_name" values={{ trackName: track.trackName }} /> by{' '}
          <a
            target="_blank"
            style={{ color: track.artistViewUrl ? colors.primary : colors.text }}
            href={track.artistViewUrl}
            rel="noreferrer"
          >
            <T id="artist_name" values={{ artistName: track.artistName }} />
          </a>
        </div>
      }
      extra={
        <a style={{ color: colors.primary }} target="_blank" href={track.trackViewUrl} rel="noreferrer">
          <T id="view_original" />
        </a>
      }
    >
      <CustomCard className="custom">
        <img src={track.artworkUrl100} />
        <div className="inner-container">
          <Text>
            <T id="track_heading" />
            {' - '}
            <strong>
              {track.collectionName ? (
                <T id="collection_name" values={{ collectionName: track.collectionName }} />
              ) : (
                <T id="track_heading_not_found" />
              )}
            </strong>
          </Text>
          <br></br>
          <div>
            <audio ref={audioRef} preload="auto">
              <source src={track.previewUrl}></source>
            </audio>
            <AudioContainer className="button-container">
              <AudioButton onClick={togglePlayState}>{playing ? <PauseOutlined /> : <CaretRightFilled />}</AudioButton>
              <Slider ref={currentTimeRef}></Slider>
            </AudioContainer>
          </div>
        </div>
      </CustomCard>
    </Card>
  );
}

Track.propTypes = {
  track: PropTypes.object
};

export default memo(Track);
