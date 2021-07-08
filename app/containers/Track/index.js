/**
 *
 * Track
 *
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card, Skeleton, Typography } from 'antd'
import {PauseOutlined,CaretRightFilled } from '@ant-design/icons'
// import { FormattedMessage as T } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { useInjectSaga } from '@utils/injectSaga'
import { selectTrack } from './selectors'
import { trackCreators } from './reducer'
import saga from './saga'
import { colors } from '@app/themes/index'

const TrackWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  
`;
const CustomCard = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  img {
    max-width: 150px;
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
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    height: 20px;
    width: 20px;
  }
`;

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Slider  = styled.div`
  margin-left: 15px;
  border-radius: 50px;
  height: 4px;
  background: ${colors.primary};
`;
const Pill = styled.div`
  padding: 5px 8px;
  border-radius: 50px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  width: fit-content;
  margin-bottom: 8px;
  font-size: .7em;
`;
const CustomLink = styled(Link)`
  && {
    color: ${colors.primary}
  }
`

const { Text } = Typography;
export function Track(
  {
    track,
    dispatchGetTrackByid,
    match
  }
) {
  useInjectSaga({ key: 'track', saga })
  const { params } = match;
  const trackId = params.trackId;
  const audioRef = useRef(null)
  const [playing, setPlaying]= useState(false)
  const currentTimeRef = useRef(null)

  const togglePlayState = () => {
    if(!playing) {
      setPlaying(!playing)
      audioRef.current.play();
    }
    else {
      setPlaying(!playing)
      audioRef.current.pause();
    }
  }
  audioRef && audioRef.current && audioRef.current.addEventListener('timeupdate', e => currentTimeRef.current.style.width = (audioRef.current.currentTime / audioRef.current.duration) * 100 + '%')
  useEffect(() => {
    dispatchGetTrackByid(trackId);
    return () => {

    }
  }, [])
  return (
    <TrackWrapper >
      <CustomLink to="/demo">
        View all tracks
      </CustomLink>
      <br />
      <br />
      {track ? (
        <Card title={<div>{track.trackName} by <a target="_blank" style={{color: track.artistViewUrl ? colors.primary : colors.text}} href={track.artistViewUrl}>{track.artistName}</a></div>} extra={<a style={{ color: colors.primary }} target="_blank" href={track.trackViewUrl}>View Original Track</a>} >
          <Skeleton loading={false}>
            <CustomCard className="custom">
              <img src={track.artworkUrl100} />
              <div className="inner-container">
                <Text><strong>From the Collection</strong> - {track.collectionName ? track.collectionName : 'Not from any collection'}</Text>
                <br></br>
                <div >
                  <audio ref={audioRef} preload="auto">
                    <source src={track.previewUrl} >
                    </source>
                  </audio>
                  {/* <Pill>
                    {track.primaryGenreName.toUpperCase()}
                  </Pill> */}
                  <AudioContainer className="button-container"> 
                  {/* {currentTime} */}
                    <AudioButton onClick={e => togglePlayState()} >
                      {playing  ? <PauseOutlined/> : <CaretRightFilled/>}
                    </AudioButton>
                      <Slider ref={currentTimeRef}>
                        <small></small>
                      </Slider>
                  </AudioContainer>
                </div>
              </div>
            </CustomCard>
          </Skeleton>
        </Card>
      ) : (
        <Skeleton>
          
        </Skeleton>
      )}  
    </TrackWrapper>
  )       
}

Track.propTypes = {
  track: PropTypes.object,
  dispatchGetTrackByid: PropTypes.func,
  match: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
  track: selectTrack(),
})

function mapDispatchToProps(dispatch) {
  const { getTrackById } = trackCreators;
  return {
    dispatchGetTrackByid: (trackId) => dispatch(getTrackById(trackId))
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  memo,
)(Track)

export const TrackTest = compose(injectIntl)(Track)