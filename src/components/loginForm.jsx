import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "User name is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors });
    if (errors) return;

    console.log("Submitted-");
  };
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="User Name"
            value={account.username}
            type="text"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
