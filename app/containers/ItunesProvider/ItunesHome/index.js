/**
 *
 * Demo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Input, Card } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectDemo, { selectError, selectSearchText, selectSongs, selectLoading } from '../selectors';
import { demoCreators } from '../reducer';
import saga from '../saga';
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
    margin-bottom: 1em;
    &:hover {
      color: ${colors.primary};
    }
  }
`;

const CustomInput = styled(Input)`
  && {
    padding: 0.7em;
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
  max-width: 80em;
  margin: 2em auto;
  padding: 0 1.3em;
`;

export function Demo({ dispatchGetSongs, dispatchClearSongs, songs, error, loading }) {
  useInjectSaga({ key: 'demo', saga });
  const handleOnChange = searchText => {
    if (searchText === '') {
      dispatchClearSongs();
    } else {
      dispatchGetSongs(searchText);
    }
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
      <TrackGrid songs={songs} loading={loading} />
    </CenteredDiv>
  );
}

Demo.propTypes = {
  songs: PropTypes.array,
  loading: PropTypes.bool,
  dispatchGetSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
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
  const { requestGetSongs, clearSongs } = demoCreators;
  return {
    dispatchGetSongs: searchText => dispatch(requestGetSongs(searchText)),
    dispatchClearSongs: () => dispatch(clearSongs())
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
