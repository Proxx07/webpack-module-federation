import {BuildOptions} from "@/config/build/types/types";
import {removeTestAttrsPlugin} from "./removeTestAttrsPlugin";

export const setBabelLoader = (options: BuildOptions) => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', {
            runtime: options.isDev ? 'automatic' : 'classic'
          }]
        ],
        plugins: [
          [
            removeTestAttrsPlugin,
            {
              props: ['data-testid']
            }
          ]
        ]
      }
    }
  }
}