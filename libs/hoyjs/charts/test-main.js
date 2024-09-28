var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  packages: [
    {
      name: '@hoyui/base',
      location: 'node_modules/@hoyui/base/dist',
      main: 'ej2-base.umd.min.js',
    },
    {
      name: '@hoyui/data',
      location: 'node_modules/@hoyui/data/dist',
      main: 'ej2-data.umd.min.js',
    },
    {
      name: '@hoyui/svg-base',
      location: 'node_modules/@hoyui/svg-base/dist',
      main: 'ej2-svg-base.umd.min.js',
    },
    {
      name: '@hoyui/pdf-export',
      location: 'node_modules/@hoyui/pdf-export/dist',
      main: 'ej2-pdf-export.umd.min.js',
    },
    {
      name: '@hoyui/file-utils',
      location: 'node_modules/@hoyui/file-utils/dist',
      main: 'ej2-file-utils.umd.min.js',
    },
    {
      name: '@hoyui/compression',
      location: 'node_modules/@hoyui/compression/dist',
      main: 'ej2-compression.umd.min.js',
    },
    {
      name: '@hoyui/navigations',
      location: 'node_modules/@hoyui/navigations/dist',
      main: 'ej2-navigations.umd.min.js',
    },
    {
      name: '@hoyui/calendars',
      location: 'node_modules/@hoyui/calendars/dist',
      main: 'ej2-calendars.umd.min.js',
    },
    {
      name: '@hoyui/popups',
      location: 'node_modules/@hoyui/popups/dist',
      main: 'ej2-popups.umd.min.js',
    },
    {
      name: '@hoyui/lists',
      location: 'node_modules/@hoyui/lists/dist',
      main: 'ej2-lists.umd.min.js',
    },
    {
      name: '@hoyui/inputs',
      location: 'node_modules/@hoyui/inputs/dist',
      main: 'ej2-inputs.umd.min.js',
    },
    {
      name: '@hoyui/buttons',
      location: 'node_modules/@hoyui/buttons/dist',
      main: 'ej2-buttons.umd.min.js',
    },
    {
      name: '@hoyui/splitbuttons',
      location: 'node_modules/@hoyui/splitbuttons/dist',
      main: 'ej2-splitbuttons.umd.min.js',
    },
    {
      name: '@hoyui/excel-export',
      location: 'node_modules/@hoyui/excel-export/dist',
      main: 'ej2-excel-export.umd.min.js',
    },
    // Include dependent packages
  ],

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
});
