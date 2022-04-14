const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#a0c9c1' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
