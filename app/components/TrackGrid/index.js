/**
 *
 * TrackGrid
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import For from '@components/For';
import T from '@components/T';
import { propTypeConstants } from '@utils/propTypeConstants';
import { colors, fonts } from '@app/themes/';

const GridCard = styled.div`
  display: grid;
  margin-top: 2em;
  grid-template-columns: repeat(auto-fit, minmax(18.75em, 1fr));
  gap: 1.5em;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 5em;
    width: 4em;
    height: 4em;
  }
`;
const StyledT = styled(T)`
  && {
    ${props => props.small && fonts.size.small()};
  }
`;
const VSpace = styled.div`
  margin: 0.5em 0;
`;
const Container = styled.div`
  width: 100%;
  padding: 1em 0;
`;
const Content = styled.div`
  margin-left: 2em;
  flex: 1;
`;

function TrackGrid({ songs }) {
  return (
    <Container data-testid="track-grid">
      <For
        of={songs}
        isRow={false}
        ParentComponent={GridCard}
        renderItem={(song, idx) => (
          <Card key={idx}>
            <FlexContainer>
              <img src={song.artworkUrl60} />
              <Content>
                <Tooltip
                  placement="topLeft"
                  title={<StyledT small id="collection_name" values={{ collectionName: song.collectionName }} />}
                >
                  <Link to={`/track/${song.trackId}`} style={{ color: colors.primary }}>
                    <StyledT id="track_name" values={{ trackName: song.trackName }} />
                  </Link>
                </Tooltip>
                <StyledT
                  small
                  id="artist_name"
                  type="subtext"
                  style={{ color: colors.text }}
                  values={{ artistName: song.artistName }}
                />
                <VSpace />
                <Tag color={colors.primary}>
                  <StyledT small id="genre_name" values={{ genreName: song.primaryGenreName }} />
                </Tag>
              </Content>
            </FlexContainer>
          </Card>
        )}
      />
    </Container>
  );
}

TrackGrid.propTypes = {
  songs: PropTypes.arrayOf(propTypeConstants).isRequired
};

export default memo(TrackGrid);
