import path from 'path';
import webpack from "webpack";
import { buildWebpack, BuildPaths, BuildMode, BuildPlatform} from '@packages/build-config';

import packageJson from './package.json';

interface IEnv {
  mode?: BuildMode
  port?: number
  analyzer?: boolean,
  platform?: BuildPlatform,
};

export default (env: IEnv) => {
  const paths: BuildPaths = {
    src: path.resolve(__dirname, 'src'),
    html: path.resolve(__dirname, 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    public: path.resolve(__dirname, 'public'),
    output: path.resolve(__dirname, 'build'),
  }

  const config = buildWebpack({
    port: env.port ?? 5000,
    mode: env.mode ?? 'development',
    paths: paths,
    isDev: env.mode === 'development',
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './router': './src/router/router.tsx',
      },

      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },

        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        }
      }
    })
  )

  return config;
};