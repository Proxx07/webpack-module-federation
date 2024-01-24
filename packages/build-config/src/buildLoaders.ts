import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";
import {BuildOptions} from "./types/types";
//import {setBabelLoader} from "./babel/setBabelLoader";

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: options.isDev,
          getCustomTransformers: () => ({
            before: [options.isDev && ReactRefreshTypescript()].filter(Boolean)
          })
        }
      }
    ],
    exclude: /node_modules/,
  };

  //const babelLoader = setBabelLoader(options)

  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: options.isDev ? '[path][name]__[local]' : '[hash:base64:7]',
          }
        }
      },
      'sass-loader'
    ],
  };

  const imagesLoader = {
    test: /\.(png|jpg|jpeg|webp|gif)$/i,
    type: 'asset/resource',
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ],
  }

  return [
    tsLoader, //babelLoader,
    styleLoader, imagesLoader, svgLoader
  ];
}