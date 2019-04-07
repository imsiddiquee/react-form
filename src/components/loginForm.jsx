import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted-");
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              value={account.username}
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
              value={account.password}
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
