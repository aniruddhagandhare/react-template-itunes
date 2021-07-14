import ItunesHome from '@app/containers/ItunesProvider/ItunesHome/Loadable';
import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import Track from './containers/ItunesProvider/Track/Loadable';
export const routeConfig = {
  itunes: {
    component: ItunesHome,
    ...routeConstants.itunes
  },
  track: {
    component: Track,
    ...routeConstants.track
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
