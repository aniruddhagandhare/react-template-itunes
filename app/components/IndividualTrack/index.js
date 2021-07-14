import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Tooltip, Tag } from 'antd';
import { PauseOutlined, CaretRightFilled } from '@ant-design/icons';
import T from '@components/T';
import { colors } from '@app/themes';
import PropTypeContants from '@app/utils/PropTypeContants';

const Content = styled.div`
  display: flex;
  position: relative;
  align-items: ${props => props.alignCenter && `center`};
`;
const RightContent = styled.div`
  margin-left: 2em;
  flex: 1;
`;
const AudioButton = styled.div`
  color: ${colors.primary};
  cursor: pointer;
  z-index: 10;
  svg {
    height: 2.4em;
    width: 2.4em;
  }
`;
const AudioContainer = styled.div`
  background-image: url(${props => props.src});
  height: 7.5em;
  background-size: cover;
  width: 7.5em;
  border-radius: 2em;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${colors.overlay};
  }
`;
const CustomCard = styled(Card)`
  && {
    overflow: hidden;
  }
`;
const StyledT = styled(T)`
  && {
    color: ${props => props.primary && colors.primary};
  }
`;
const VSpace = styled.div`
  margin: 0.5em 0;
`;
const LinkTo = styled.a`
  position: absolute;
  top: 0.3em;
  right: 1em;
  color: ${colors.primary};
  &:hover {
    color: ${colors.text};
  }
`;
const SongProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.2em;
  background: ${colors.primary};
`;

function IndividualTrack({ track }) {
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
    <div>
      <CustomCard>
        <Content>
          <div>
            <AudioContainer src={track.artworkUrl100}>
              <audio ref={audioRef} preload="auto">
                <source src={track.previewUrl}></source>
              </audio>
              <AudioButton onClick={togglePlayState}>{playing ? <PauseOutlined /> : <CaretRightFilled />}</AudioButton>
            </AudioContainer>
          </div>
          <RightContent>
            <Tooltip
              placement="topLeft"
              title={<StyledT type="subText" id="collection_name" values={{ collectionName: track.collectionName }} />}
            >
              <StyledT type="subheading" id="track_name" values={{ trackName: track.trackName }} />
            </Tooltip>
            <a style={{ color: colors.primary }} href={track.artistViewUrl} target="_blank" rel="noreferrer">
              <StyledT type="subText" id="artist_name" values={{ artistName: track.artistName }} />
            </a>
            <VSpace />
            <StyledT id="price" values={{ price: track.trackPrice }} />
            <Tag color={colors.primary}>
              <StyledT type="subText" id="explicit" values={{ explicit: track.trackExplicitness }} />
            </Tag>
            <Tag color={colors.primary}>
              <StyledT type="subText" id="genre_name" values={{ genreName: track.primaryGenreName }} />
            </Tag>
          </RightContent>
          <LinkTo href={track.trackViewUrl} target="_blank">
            <StyledT type="subText" id="link_to_itunes" />
          </LinkTo>
        </Content>
        <SongProgress ref={currentTimeRef} />
      </CustomCard>
    </div>
  );
}

IndividualTrack.propTypes = {
  track: PropTypes.shape(PropTypeContants)
};

export default memo(IndividualTrack);
