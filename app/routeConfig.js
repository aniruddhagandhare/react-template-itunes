import Demo from '@containers/Demo/Loadable';
import Floating from '@containers/FloatingButton/Loadable';
import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  floating: {
    component: Floating,
    ...routeConstants.floating
  },
  demo: {
    component: Demo,
    route: '/demo'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
