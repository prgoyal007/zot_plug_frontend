// mobile/babel.config.js
// mobile/babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // keep this last if you use Reanimated (safe to include even if unused)
      'react-native-reanimated/plugin',
    ],
  };
};

