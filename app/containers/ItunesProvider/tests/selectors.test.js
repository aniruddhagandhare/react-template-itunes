import { testData } from '@app/utils/testData';
import {
  selectItunesDomain,
  selectLoading,
  selectSongs,
  selectTrack,
  selectError,
  selectSearchText
} from '../selectors';

describe('Demo selector tests', () => {
  let mockedState;
  let songs;
  let track;
  let loading;
  let error;
  let searchText;

  beforeEach(() => {
    songs = [{ ...testData }];
    track = testData;
    loading = false;
    error = null;
    searchText = 'drake';
    mockedState = {
      itunesReducer: {
        songs,
        track,
        loading,
        error,
        searchText
      }
    };
  });

  it('should select the user state', () => {
    expect(selectItunesDomain(mockedState)).toEqual(mockedState.itunesReducer);
  });

  it('should select songs from the state', () => {
    const songSelector = selectSongs();
    expect(songSelector(mockedState)).toEqual(songs);
  });
  it('should select track from the state', () => {
    const trackSelector = selectTrack();
    expect(trackSelector(mockedState)).toEqual(track);
  });
  it('should select error from the state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(error);
  });
  it('should select loading from the state', () => {
    const loadingSelector = selectLoading();
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
  it('should select searchText from the state', () => {
    const searchTextSelector = selectSearchText();
    expect(searchTextSelector(mockedState)).toEqual(searchText);
  });
});
