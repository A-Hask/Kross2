import React, { useState } from "react";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";

const Login = () => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const [formState, updateFormState] = useState({ email: "", password: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (error) {
      console.log(error);
    }
    // clear form values
    updateFormState({
      email: "",
      password: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <main className="w-100 mt-auto bg-secondary p-4">
      <form>
        <div>
          <h3>Log In</h3>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleFormSubmit}>Submit</button>
          </div>
        </div>
      </form>
      {error && <div>Login failed</div>}
    </main>
  );
};

export default Login;
