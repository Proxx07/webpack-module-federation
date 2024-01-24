export interface BuildPaths {
  src: string
  html: string
  entry: string
  public: string
  output: string
}

export type BuildMode = 'production' | 'development'
export type BuildPlatform = 'mobile' | 'desktop'

export interface BuildOptions {
  port: number
  paths: BuildPaths
  mode: BuildMode
  isDev: boolean
  analyzer?: boolean
  platform: BuildPlatform
}