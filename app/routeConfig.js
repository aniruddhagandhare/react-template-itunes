import Demo from '@app/containers/ItunesProvider/ItunesHome/Loadable';
import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import Track from './containers/ItunesProvider/Track/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  demo: {
    component: Demo,
    ...routeConstants.demo
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
