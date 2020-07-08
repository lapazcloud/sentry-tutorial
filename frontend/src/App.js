import React from 'react';
import './App.css';

import { login } from './api';
import LoginForm from './components/LoginForm';
import ItemsContainer from './ItemsContainer';
import * as Sentry from '@sentry/browser';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: { state: 'no_session' }
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  async loginHandler(credentials) {
    try {
      const result = await login(credentials);
      localStorage.setItem('token', result.data.accessToken);
      localStorage.setItem('role', result.data.role);
      this.setState({auth: {state: 'logged_in', token: result.accessToken, role: result.data.role}});
      Sentry.setUser({
        id: credentials.username,
        username: credentials.username,
      });
      Sentry.setTag('role', result.data.role);
      Sentry.setExtra('token', result.data.accessToken);
    } catch(err) {
      err.response.status === 401 && this.setState({auth: {state: 'login_failed'}});
    }
  }
  logoutHandler() {
    localStorage.clear();
    this.setState({auth: {state: 'no_session'}});
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      this.setState({
        auth: { state: 'logged_in', token, role }
      });
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.auth.state === 'logged_in'
          ?
          <div>
            <button type="button" onClick={this.logoutHandler}>Logout</button>
            <ItemsContainer auth={this.state.auth} />
          </div>
          : <LoginForm authState={this.state.auth.state} onLogin={this.loginHandler} />
        }
      </div>
    );
  }
}

export default App;
