const path = require('path');

const createConfig = (options, isDebugging) => {
  return {
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
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/',
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
    // Don't bundle react or react-dom
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  };

  if (!isDebugging) {
    configs.push(
      createConfig(
        {
          mode: 'production',
          entry: path.join(__dirname, 'src', 'index.tsx'),
          outputFilename: 'react-file-agent.min.js',
          externals: externals,
          // mode: 'none',
        },
        isDebugging,
      ),
    );
  }
  const entry = {
    'react-file-agent': path.join(__dirname, 'src', 'index.tsx'),
  };
  const rules = [];
  let alias = {};
  if (isDebugging) {
    entry['react-file-agent-demo'] = path.join(__dirname, 'src', 'demo', 'index.tsx');
    rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    });
    alias = {
      // '@file-agent/core$': '@file-agent/core/dist/file-agent.js',
      // '@file-agent/core/dist/file-agent.min.js$': '@file-agent/core/dist/file-agent.js',
      '@file-agent/core$': path.resolve(__dirname, '../core/dist/file-agent.js'),
      '@file-agent/core/dist/file-agent.min.js$': path.resolve(__dirname, '../core/dist/file-agent.js'),
    };
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
              contentBase: [path.join(__dirname, ''), path.join(__dirname, '../core/dist')],
              // contentBase: ['/tests/', '/src/'],
              compress: true,
              port: 9001,
              watchOptions: {
                // ignored: ['**/*.js', '**/*.d.ts', 'node_modules/**'],
                ignored: ['**/*.d.ts', 'node_modules/**'],
              },
              openPage: 'demo/index.html',
              inline: true,
              publicPath: '/dist/',
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
