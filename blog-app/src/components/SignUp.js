import React from 'react';
import validation from '../utils/validation';
import { SignUpURL } from '../utils/constant';
import { withRouter } from 'react-router';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.error };
    validation(errors, name, value);
    this.setState({ [name]: value, errors });
  };
  handelSubmit = (event) => {
    const { username, email, password } = this.state;
    event.preventDefault();
    fetch(SignUpURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
          // throw new Error('Fatch is not successful');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: '', email: '', password: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { username, email, password, errors } = this.state;
    return (
      <>
        <section>
          <form className="form-control signin" onSubmit={this.handelSubmit}>
            <h2>Sign Up</h2>
            <p>Have an account?</p>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username"
              value={username}
            />
            <span className="color-red">{errors.username}</span>
            <input
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
            />
            <span className="color-red">{errors.email}</span>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
            />
            <span className="color-red">{errors.password}</span>
            <div>
              <button
                className="login-btn"
                type="submit"
                disabled={errors.username || errors.email || errors.password}
              >
                Sign Up
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
}

export default withRouter(SignUp);
