/**
 *
 * Demo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
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
import { colors } from '@app/themes/index';
import TrackGrid from '@app/components/TrackGrid/index';
import { fonts } from '@app/themes';

// styled components
const BackLink = styled.div`
  a {
    color: ${colors.text};
    font-weight: bold;
    ${fonts.size.regular()}
    display: block;
    margin-bottom: 30px;
    &:hover {
      color: ${colors.primary};
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
      border-bottom: 1px solid ${colors.primary};
    }
  }
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const CenteredDiv = styled.div`
  max-width: ${1100 / 16}em;
  margin: ${30 / 16}em auto;
  padding: 0 20px;
`;

export function Demo({ dispatchGetSongs, songs, loading, error, searchText }) {
  useInjectSaga({ key: 'demo', saga });
  const handleOnChange = searchText => {
    dispatchGetSongs(searchText);
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <CenteredDiv>
      <BackLink>
        <Link to="/">
          <T id="back_to_home" />
        </Link>
      </BackLink>
      <Card title={<T id="track_list_heading" />}>
        <FlexWrapper>
          <CustomInput
            onChange={e => debouncedHandleOnChange(e.target.value)}
            placeholder="Search iTunes"
          ></CustomInput>
        </FlexWrapper>
      </Card>
      {!loading ? <TrackGrid songs={songs} loading={loading} /> : <Skeleton></Skeleton>}
    </CenteredDiv>
  );
}

Demo.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.bool,
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
