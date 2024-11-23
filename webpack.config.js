import path from 'path';

export default {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve("dist"),
    libraryTarget: 'module',
  },
  target: 'node',
  experiments: {
    outputModule: true,
  }
};