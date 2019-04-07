import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const username = this.username.current.value;
    console.log("Submitted-", username);
  };

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="User Name"
              ref={this.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
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
