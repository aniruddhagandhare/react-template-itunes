import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSongs = searchText => itunesApi.get(`search?term=${searchText}&media=music`);

export const getTrack = trackId => itunesApi.get(`lookup?id=${trackId}`);
