import { PureComponent } from 'react'
import getDisplayName from 'react-display-name'
import Effects from './context'

export default function withEffects(pickEffects, Component) {
  return class extends PureComponent {
    static displayName = `withEffects(${getDisplayName(Component)})`
    render() {
      return (
        <Effects.Consumer>
          { effects => <Component {...pickEffects(effects)} {...this.props}/> }
        </Effects.Consumer>
      )
    }
  }
}
