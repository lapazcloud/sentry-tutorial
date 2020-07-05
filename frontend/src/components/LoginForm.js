import React from 'react';


function LoginForm(props) {
  const loginHandler = (e) => {
    e.preventDefault();
    const username = e.currentTarget.elements.username.value;
    const password = e.currentTarget.elements.password.value;
    props.onLogin && props.onLogin({username, password});
    e.currentTarget.elements.password.value = '';
  }
  return (
    <div>
      <form onSubmit={loginHandler}>
        {props.authState === 'login_failed' ? <p>Invalid credentials</p> : ''}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
