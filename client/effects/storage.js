import { isServer } from '../util'

export default {
  get(key) {
    return isServer
      ? null
      : JSON.parse(localStorage.getItem(key))
  },
  set(key, value) {
    if (isServer) return
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    if (isServer) return
    localStorage.removeItem(key)
  }
}
