import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("User Name"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted-");
  };
  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "User name is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account: account, errors: errors });
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
