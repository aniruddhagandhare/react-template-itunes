import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('itunes');

export const getSongs = searchText => repoApi.get(`search?term=${searchText}`);

export const getTrack = trackId => repoApi.get(`https://itunes.apple.com/lookup?id=909253`);
