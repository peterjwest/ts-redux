import * as React from 'react';

import { Store, actions } from './reducer';
import { connect, ActionProps } from './ts-redux';

interface AppStoreProps {
  name: string;
}

interface AppProps extends AppStoreProps, ActionProps<Store> {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
  changeName(name: string) {
    return () => this.props.dispatch(actions.updateName(name));
  }

  render() {
    return (
      <div className={'App'}>
        I am {this.props.name}
        <br></br>
        <button onClick={this.changeName('Ellie')}>Become Ellie</button>
        <button onClick={this.changeName('Joe')}>Become Joe</button>
      </div>
    );
  }
}

const AppContainer = connect(App, (store: Store): AppStoreProps => {
  return { name: store.name };
});
export default AppContainer;
