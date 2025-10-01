// mobile/babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          ui: '../lib/ui',
          api: '../lib/api',
        },
      }],
      // keep this last if you use Reanimated (safe to include even if unused)
      'react-native-reanimated/plugin',
    ],
  };
};

