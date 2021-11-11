import { app } from 'electron'

const helper = {
  get assetsPath() {
    return process.env.NODE_ENV === 'production'
      ? process.resourcesPath
      : app.getAppPath()
  },
}

export default helper
