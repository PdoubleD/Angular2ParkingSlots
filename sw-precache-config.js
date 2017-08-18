module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  navigateFallbackWhitelist: [/^(?!\/__)/],
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/**',
    'dist/**.ttf'
  ]
};