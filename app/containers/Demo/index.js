/**
 *
 * Demo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Input, Card, Skeleton } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectDemo, { selectError, selectSearchText, selectSongs, selectLoading } from './selectors';
import { demoCreators } from './reducer';
import saga from './saga';

// styled components

const CustomText = styled.small`
  font-size: ${props => props.size}px;
  color: ${props => (props.color ? props.color : '#333')};
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

const BackLink = styled.div`
  a {
    color: #333;
    font-weight: bold;
    font-size: 15px;
    display: block;
    margin-bottom: 30px;

    &:hover {
      color: orange;
    }
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
  }
`;

const CustomInput = styled(Input)`
  && {
    padding: 12px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.04);
    background-color: inherit;
    border: 1px solid #e8e8e8;
    transition: all 0.2s;
    &:hover {
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.04);
      border: 1px solid #e8e8e8;
    }
    &:focus {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.04);
      border: 1px solid #e8e8e8;
      border-bottom: 1px solid orange;
    }
  }
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const CenteredDiv = styled.div`
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
`;
const GridCard = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const renderSongs = (songs, loading) => {
  return (
    <GridCard>
      <Skeleton loading={loading} active>
        {songs.map((song, idx) => {
          if (song.wrapperType === 'track') {
            return (
              <CustomCard key={idx} cover={<img alt="example" src={song.artworkUrl100} />}>
                <div className="inner-wrapper">
                  <div>
                    <CustomText color="orange" size="12">
                      {song.artistName}
                    </CustomText>
                    <CustomText size="14" title={song.collectionName}>
                      <Link to={`/track/${song.trackId}`}>
                        {song.collectionName ? song.collectionName : 'Untitled'}
                      </Link>
                    </CustomText>
                    <CustomText size="14" color="#999">
                      {song.primaryGenreName}
                    </CustomText>
                  </div>
                  <div className="audio-control">
                    <audio controls>
                      <source src={song.previewUrl} />
                    </audio>
                  </div>
                </div>
              </CustomCard>
            );
          }
        })}
      </Skeleton>
    </GridCard>
  );
};

export function Demo({ dispatchGetSongs, songs, loading, error, searchText }) {
  useInjectSaga({ key: 'demo', saga });
  const handleOnChange = searchText => {
    dispatchGetSongs(searchText);
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <CenteredDiv>
      <Link to="/track/1">Track</Link>
      <BackLink>
        <Link to="/">Back</Link>
      </BackLink>
      <Card title="Listen to your Favourite Tracks">
        <FlexWrapper>
          <CustomInput
            onChange={e => debouncedHandleOnChange(e.target.value)}
            placeholder="Search iTunes"
          ></CustomInput>
        </FlexWrapper>
      </Card>
      {renderSongs(songs, loading)}
    </CenteredDiv>
  );
}

Demo.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.boolean,
  dispatchGetSongs: PropTypes.func,
  error: PropTypes.string,
  searchText: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  demo: makeSelectDemo(),
  songs: selectSongs(),
  loading: selectLoading(),
  error: selectError(),
  searchText: selectSearchText()
});

function mapDispatchToProps(dispatch) {
  const { getSongs } = demoCreators;
  return {
    dispatchGetSongs: searchText => dispatch(getSongs(searchText))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(Demo);

export const DemoTest = compose(injectIntl)(Demo);
