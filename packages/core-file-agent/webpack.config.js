const path = require('path');

const createConfig = (options) => {
  return {
    watch: options.watch === true,
    watchOptions:
      options.watch === true
        ? {
            ignored: ['**/*.js', '**/*.d.ts', 'node_modules/**'],
          }
        : {},
    mode: options.mode,
    devtool: options.devtool || 'source-map',
    entry: './src/index.ts',
    output: {
      path: options.output || path.resolve(__dirname, 'dist'),
      filename: 'core-file-agent' + (options.mode === 'production' ? '.min' : '') + '.js',
      library: 'core-file-agent',
      libraryTarget: 'umd',
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };
};

module.exports = (env, argv) => {
  const isDebugging = env === 'development';

  const configs = [];

  if (!isDebugging) {
    configs.push(
      createConfig({
        mode: 'production',
      }),
    );
  }
  configs.push(
    createConfig({
      mode: 'development',
      watch: true,
    }),
  );

  return configs;
};
