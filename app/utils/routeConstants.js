export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  demo: {
    route: '/demo',
    props: {}
  },
  track: {
    route: '/track/:trackId',
    props: {}
  }
};
