const path = require('path');

function resolver({ rootDir }) {
  const appSrc = `${rootDir}/src`;

  return {
    '@': path.resolve(appSrc),
    '@assets': path.resolve(appSrc, './assets/'),
    '@components': path.resolve(appSrc, './components/'),
    '@constants': path.resolve(appSrc, './constants/'),
    '@context': path.resolve(appSrc, './context/'),
    '@pages': path.resolve(appSrc, './pages/'),
    '@helpers': path.resolve(appSrc, './helper/'),
    '@route-gateway': path.resolve(appSrc, './pages/index.js'),
    '@styles': path.resolve(appSrc, './styles/'),
    '@worker': path.resolve(appSrc, './serviceWorker/index.js'),
    '@config': path.resolve(appSrc, './config/'),
  };
}

module.exports = resolver;
