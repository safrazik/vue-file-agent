const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const createConfig = (options, isDebugging) => {
  return {
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'vue-file-agent-demo.css',
      }),
    ],
    watch: options.watch === true,
    watchOptions:
      options.watch === true
        ? {
            ignored: ['**/*.js', '**/*.d.ts', 'node_modules/**'],
          }
        : {},
    // target: 'web',
    mode: options.mode,
    devtool: options.devtool || 'source-map',
    entry: options.entry,
    output: {
      path: options.outputPath || path.resolve(__dirname, 'dist'),
      filename: options.outputFilename,
      libraryTarget: 'umd',
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    module: {
      rules: (options.rules || []).concat([
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        // {
        //   test: /\.tsx?$/,
        //   use: 'ts-loader',
        //   exclude: '/node_modules/',
        // },
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: isDebugging ? 'tsconfig.json' : 'tsconfig.build.json',
              appendTsSuffixTo: [/\.vue$/],
            },
          },
          exclude: '/node_modules/',
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
      ]),
    },
    externals: options.externals,
    resolve: {
      alias: options.alias || {},
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: options.devServer,
  };
};

module.exports = (env, argv) => {
  const isDebugging = env === 'development';

  const configs = [];

  const externals = {
    // Don't bundle vue
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'Vue',
      root: 'Vue',
    },
  };

  const entry = {
    // 'vue-file-agent': path.join(__dirname, 'src', 'index.ts'),
  };
  const rules = [];
  let alias = {};
  if (isDebugging) {
    entry['vue-file-agent-demo'] = path.join(__dirname, 'src', 'demo', 'index.ts');
    // rules.push({
    //   test: /\.css$/i,
    //   use: ['style-loader', 'css-loader'],
    // });
    alias = {
      // '@file-agent/core$': '@file-agent/core/dist/file-agent.js',
      // '@file-agent/core/dist/file-agent.min.js$': '@file-agent/core/dist/file-agent.js',
      //
      // '@file-agent/core$': path.resolve(__dirname, '../core/dist/file-agent.js'),
      // '@file-agent/core/dist/file-agent.min.js$': path.resolve(__dirname, '../core/dist/file-agent.js'),
      '@file-agent/core': path.resolve(__dirname, '../core/src'),
      // '@file-agent/core/dist/file-agent.min.js$': path.resolve(__dirname, '../core/src'),
    };
  } else {
    entry['vue-file-agent'] = path.join(__dirname, 'src', 'index.ts');
    externals['@file-agent/core'] = {
      commonjs: '@file-agent/core',
      commonjs2: '@file-agent/core',
      amd: 'FileAgent',
      root: 'FileAgent',
    };
    configs.push(
      createConfig(
        {
          mode: 'production',
          entry: entry,
          outputFilename: '[name].min.js',
          externals: externals,
          // mode: 'none',
        },
        isDebugging,
      ),
    );
  }
  configs.push(
    createConfig(
      {
        mode: 'development',
        entry: entry,
        outputFilename: '[name].js',
        watch: true,
        externals: isDebugging ? undefined : externals,
        rules: rules,
        alias: alias,
        devServer: isDebugging
          ? {
              contentBase: [path.join(__dirname, ''), path.join(__dirname, '../core')],
              // contentBase: ['/tests/', '/src/'],
              compress: true,
              port: 9002,
              watchOptions: {
                // ignored: ['**/*.js', '**/*.d.ts', 'node_modules/**'],
                ignored: ['**/*.d.ts', 'node_modules/**'],
              },
              // openPage: 'demo/index.html',
              inline: true,
              // publicPath: '/dist/',
              hot: true,
              hotOnly: false,
            }
          : undefined,
      },
      isDebugging,
    ),
  );

  return configs;
};
