/* eslint-disable no-template-curly-in-string */
module.exports = {
  presets: ['react-app'],
  plugins: [
    'lodash',
    '@babel/plugin-proposal-optional-chaining',
    [
      'transform-imports',
      {
        reactstrap: {
          transform: 'reactstrap/lib/${member}',
          preventFullImport: true,
        },
        'react-router': {
          transform: 'react-router-dom/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
};
