import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { PauseOutlined, CaretRightFilled } from '@ant-design/icons';
import T from '@components/T';
import If from '@components/If';
import { colors, media } from '@app/themes';

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
const StyledT = styled(T)`
  && {
    display: inline;
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

function Track({ track, showInfo }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const currentTimeRef = useRef(null);

  const togglePlayState = () => {
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };
  audioRef?.current?.addEventListener(
    'timeupdate',
    e => (currentTimeRef.current.style.width = (audioRef.current.currentTime / audioRef.current.duration) * 100 + '%')
  );
  return (
    <Card
      title={
        <div>
          <Link style={{ color: colors.primary }} to={`/track/${track.trackId}`}>
            <StyledT id="track_name" values={{ trackName: track.trackName }} />
          </Link>
          <If condition={showInfo}>
            <StyledT id="by" />
            <a
              target="_blank"
              style={{ color: track.artistViewUrl ? colors.primary : colors.text }}
              href={track.artistViewUrl}
              rel="noreferrer"
            >
              <StyledT id="artist_name" values={{ artistName: track.artistName }} />
            </a>
          </If>
        </div>
      }
      extra={
        showInfo && (
          <a style={{ color: colors.primary }} target="_blank" href={track.trackViewUrl} rel="noreferrer">
            <T id="view_original" />
          </a>
        )
      }
    >
      <CustomCard className="custom">
        <img src={track.artworkUrl100} />
        <div className="inner-container">
          <Text>
            <StyledT type="subtext" id="track_heading" />
            <If condition={track.collectionName} otherwise={<StyledT id="track_heading_not_found" />}>
              <StyledT type="standard" id="collection_name" values={{ collectionName: track.collectionName }} />
            </If>
          </Text>
          <If condition={showInfo}>
            <audio ref={audioRef} preload="auto">
              <source src={track.previewUrl}></source>
            </audio>
            <AudioContainer className="button-container">
              <AudioButton onClick={togglePlayState}>{playing ? <PauseOutlined /> : <CaretRightFilled />}</AudioButton>
              <Slider ref={currentTimeRef}></Slider>
            </AudioContainer>
          </If>
        </div>
      </CustomCard>
    </Card>
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
  showInfo: PropTypes.bool
};

export default memo(Track);
