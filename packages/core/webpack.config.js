const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const createConfig = (options, isDebugging) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'file-agent.css',
      }),
    ],
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
      filename: 'file-agent' + (options.mode === 'production' ? '.min' : '') + '.js',
      library: 'file-agent',
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
          options: {
            minimize: {
              removeComments: true,
              collapseWhitespace: true,
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !!isDebugging,
              },
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: options.devServer,
  };
};

module.exports = (env, argv) => {
  const isDebugging = env === 'development';

  const configs = [];

  if (!isDebugging) {
    configs.push(
      createConfig(
        {
          mode: 'production',
        },
        isDebugging,
      ),
    );
  }
  configs.push(
    createConfig(
      {
        mode: 'development',
        watch: true,
        devServer: isDebugging
          ? {
              contentBase: path.join(__dirname, ''),
              // contentBase: ['/tests/', '/src/'],
              compress: true,
              host: '0.0.0.0',
              port: 9000,
              watchOptions: {
                ignored: ['**/*.js', '**/*.d.ts', 'node_modules/**'],
              },
              openPage: 'demo/index.html',
              inline: true,
              publicPath: '/dist/',
              hot: true,
              hotOnly: false,
              writeToDisk: true,
            }
          : undefined,
      },
      isDebugging,
    ),
  );

  return configs;
};
