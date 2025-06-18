const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Garante que o publicPath será o subdiretório correto do GitHub Pages
  config.output.publicPath = '/academia-pro/';
  return config;
};
