import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
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

  doSubmit = () => {
    console.log("Submitted-");
  };

  render() {
    const { data: data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="User Name"
            value={data.username}
            type="text"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={data.password}
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
