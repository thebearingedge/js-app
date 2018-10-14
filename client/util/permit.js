import noop from 'lodash/noop'

export default function permit(action, getInitialProps = noop) {
  return ({ res, router, session, isServer, ...ctx }) => {
    if (!session.userCan(action)) {
      return isServer
        ? res.redirect('/login')
        : router.replace('/login')
    }
    return getInitialProps({ res, router, session, isServer, ...ctx })
  }
}
