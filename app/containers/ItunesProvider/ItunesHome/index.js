/**
 *
 * ItunesHome
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, useIntl } from 'react-intl';
import { Input, Card, Skeleton, Alert } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { useInjectSaga } from '@utils/injectSaga';
import T from '@components/T';
import If from '@components/If';
import TrackGrid from '@app/components/TrackGrid';
import { colors, styles } from '@app/themes';
import makeSelectDemo, { selectError, selectSearchText, selectSongs, selectLoading } from '../selectors';
import saga from '../saga';
import { itunesCreators } from '../reducer';

// styled components
const CustomInput = styled(Input)`
  && {
    padding: 0.8em;
    background-color: inherit;
    ${styles.borderWithRadius(1, 'solid', colors.border, 0)};
    transition: all 0.2s;
    &:hover {
      ${styles.boxShadowFixed()};
      border: 1px solid ${colors.border};
    }
    &:focus {
      ${styles.boxShadowFixed()};
      ${styles.borderWithRadius(1, 'solid', colors.border, 0)};
      border-bottom: 1px solid ${colors.primary};
    }
  }
`;
const FlexWrapper = styled.div`
  display: flex;
`;
const CenteredDiv = styled.div`
  max-width: 80em;
  margin: 1.5em auto;
  padding: 0 1.4em;
`;

export function Demo({ dispatchGetSongs, dispatchClearSongs, songs, loading, error }) {
  useInjectSaga({ key: 'demo', saga });
  const handleOnChange = searchText => {
    if (isEmpty(searchText)) {
      dispatchClearSongs();
      return;
    }
    dispatchGetSongs(searchText);
  };
  const { formatMessage } = useIntl();
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <CenteredDiv>
      <Card title={<T id="track_list_heading" />}>
        <FlexWrapper>
          <CustomInput
            data-testid="search-term"
            onChange={e => debouncedHandleOnChange(e.target.value)}
            placeholder={formatMessage({ id: 'placeholder' })}
          ></CustomInput>
        </FlexWrapper>
      </Card>
      <Skeleton loading={loading} active>
        <TrackGrid songs={songs} />
      </Skeleton>
      <If condition={error}>
        <Alert message={<T id="track_error" values={{ error }} />} type="error" />
      </If>
    </CenteredDiv>
  );
}

Demo.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
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
      collectionPrice: PropTypes.number,
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
    })
  ),
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
  const { requestGetSongs, clearSongs } = itunesCreators;
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
