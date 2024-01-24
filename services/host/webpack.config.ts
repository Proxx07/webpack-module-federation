import path from 'path';
import webpack from "webpack";
import { buildWebpack, BuildPaths, BuildMode, BuildPlatform} from '@packages/build-config';

import packageJson from './package.json';

interface IEnv {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
  SHOP_REMOTE_URL?: string
  ADMIN_REMOTE_URL?: string
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
    port: env.port ?? 8080,
    mode: env.mode ?? 'development',
    paths: paths,
    isDev: env.mode === 'development',
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  });

  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:5000'
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3000'

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',

      remotes: {
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`
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