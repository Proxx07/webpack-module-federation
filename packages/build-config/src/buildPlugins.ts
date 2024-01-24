import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import { BuildOptions } from "./types/types";


export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {

  console.log(options.paths.public)

  const HTMLPlugin = new HtmlWebpackPlugin({
    template: options.paths.html,
    favicon: options.paths.public + '/favicon.svg',
    inject: 'body',
    publicPath: '/'
  });
  const definePlugin = new webpack.DefinePlugin({
    __PLATFORM__: JSON.stringify(options.platform)
  });

  const cssPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css',
  });
  const bundlePlugin = new BundleAnalyzerPlugin();
  const copyFilesPlugin = new CopyPlugin({
    patterns: [
      {from: options.paths.public, to: options.paths.output}
    ]
  });


  const progressPlugin = new webpack.ProgressPlugin();
  const tsCheckerPlugin = new ForkTsCheckerWebpackPlugin(); // Проверка типов в отдельном процессе
  const ReactHMRPlugin = new ReactRefreshPlugin();

  const plugins: Configuration['plugins'] = [HTMLPlugin, definePlugin];

  if (options.isDev) {
    plugins.push(progressPlugin)
    //plugins.push(tsCheckerPlugin)
    plugins.push(ReactHMRPlugin)
  }

  else {
    plugins.push(cssPlugin)
    options.analyzer && plugins.push(bundlePlugin)
    plugins.push(copyFilesPlugin)
  }

  return plugins;
}