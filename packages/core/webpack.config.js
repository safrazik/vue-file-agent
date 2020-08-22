const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const createConfig = (options, isDebugging) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDebugging ? 'file-agent-demo.css' : 'file-agent.css',
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
    entry: options.entry,
    output: {
      path: options.output || path.resolve(__dirname, 'dist'),
      filename: options.outputFilename,
      library: 'FileAgent',
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
              configFile: isDebugging ? 'tsconfig.build.json' : 'tsconfig.build.json',
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

  const entry = {};
  if (isDebugging) {
    entry['file-agent-demo'] = path.join(__dirname, 'src', 'demo', 'index.ts');
  } else {
    entry['file-agent'] = path.join(__dirname, 'src', 'index.ts');
    configs.push(
      createConfig(
        {
          mode: 'production',
          outputFilename: '[name].min.js',
          entry: entry,
        },
        isDebugging,
      ),
    );
  }
  configs.push(
    createConfig(
      {
        mode: 'development',
        outputFilename: '[name].js',
        entry: entry,
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
              // openPage: 'demo/index.html',
              inline: true,
              // publicPath: '/dist/',
              hot: true,
              hotOnly: false,
              // writeToDisk: true,
            }
          : undefined,
      },
      isDebugging,
    ),
  );

  return configs;
};
