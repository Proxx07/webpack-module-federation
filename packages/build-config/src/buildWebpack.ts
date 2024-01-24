import { Configuration } from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types';

export const buildWebpack = (options: BuildOptions): Configuration => {
  return {
    mode: options.mode,
    entry: options.paths.entry,

    output: {
      
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
      
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },
    
    resolve: buildResolvers(options),
    
    devtool: options.isDev && 'inline-source-map',

    devServer: options.isDev ? buildDevServer(options) : undefined
  }
}