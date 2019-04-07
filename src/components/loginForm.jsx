import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted-");
  };
  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account: account });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              value={this.state.account.username}
              onChange={this.handleChange}
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="User Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={this.state.account.password}
              onChange={this.handleChange}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
