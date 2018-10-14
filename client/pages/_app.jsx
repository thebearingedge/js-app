import noop from 'lodash/noop'
import Router from 'next/router'
import NextHead from 'next/head'
import NextApp, { Container } from 'next/app'
import { isServer } from '../util'
import { storage, initApi, initSession, Effects } from '../effects'

export default class App extends NextApp {
  static async getInitialProps({ Component, router, ctx }) {
    const user = isServer ? ctx.req.session.user : null
    const sessionID = isServer ? ctx.req.sessionID : null
    const api = initApi(sessionID)
    const session = initSession(user)
    const { getInitialProps = noop } = Component
    return {
      user: session.user,
      pageProps: await getInitialProps({
        ...ctx, api, router, session, isServer
      })
    }
  }
  constructor(props, ...args) {
    super(props, ...args)
    this.effects = {
      storage,
      api: initApi(),
      router: Router.router,
      session: initSession(props.user)
    }
  }
  render() {
    const { effects } = this
    const { Component, pageProps } = this.props
    return (
      <Container>
        <NextHead>
          <title>JS App</title>
        </NextHead>
        <Effects.Provider value={effects}>
          <Component {...pageProps}/>
        </Effects.Provider>
      </Container>
    )
  }
}
