const { getDefaultConfig } = require('metro-config');
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    ...defaultResolver,
    assetExts: defaultResolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultResolver.sourceExts, 'cjs', 'svg'],
  },
};
