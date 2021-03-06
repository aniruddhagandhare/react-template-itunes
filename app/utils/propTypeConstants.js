import PropTypes from 'prop-types';

export const propTypeConstants = PropTypes.shape({
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
  collectionProce: PropTypes.number,
  trackPrice: PropTypes.number,
  collectionExplicitness: PropTypes.string,
  trackExplicitness: PropTypes.string,
  discCount: PropTypes.number,
  trackCount: PropTypes.number,
  trackNumber: PropTypes.number,
  trackTimeMillis: PropTypes.number,
  country: PropTypes.string,
  currency: PropTypes.string,
  primaryGenreName: PropTypes.string
});
