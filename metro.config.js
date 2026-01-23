const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    minifierConfig: {
      keep_fnames: false, // Reduce function names
      mangle: {
        toplevel: true,   // Minify top-level variable names
      },
      compress: {
        drop_console: true, // Remove console logs
        dead_code: true,    // Eliminate unused code
        unused: true,       // Remove unused variables
      },
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
