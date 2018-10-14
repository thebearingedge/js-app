import { isServer } from '../util'

let session

const createSession = (_user = null) => ({
  get user() {
    return _user
  },
  start(user) {
    _user = user
  },
  end() {
    _user = null
  },
  userCan(action) {
    if (!_user) return false
    return Array.isArray(action)
      ? action.some(action => _user.permissions.includes(action))
      : _user.permissions.includes(action)
  }
})

export default function initSession(user) {
  if (isServer) return createSession(user)
  session = session || createSession(user)
  return session
}
