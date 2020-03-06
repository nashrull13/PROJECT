import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

require("../assets/login.css");
// import { Redirect } from 'react-router-dom'

const Register = props => {
  const { register, watch, errors, formState } = useForm({ mode: "onChange" });

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    admin: "",
    status: ""
  });

  const [status, setStatus] = useState({
    isRedirect: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        admin: false,
        status: false
      });

      if (result.status === 201) {
        alert(
          "Register sucessfully! please contact administrator for login access"
        );
        setStatus({ isRedirect: true });
      } else {
        throw new Error("Failed to Register");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (status.isRedirect === true) {
    window.location.replace("/login");
  }
  return (
    <div class="wrapper animated bounce">
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label id="icon" for="name">
            <i class="fa fa-user"></i>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            ref={register({
              required: "Name required!",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long"
              }
            })}
            onChange={updateField}
          />
          <span class="badge badge-danger">
            {errors.name && errors.name.message}
          </span>
        </div>

        <div>
          <label id="icon" for="username">
            <i class="fa fa-user"></i>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            ref={register({
              required: "Username required!"
            })}
            onChange={updateField}
          />
          <span class="badge badge-danger">
            {errors.username && errors.username.message}
          </span>
        </div>

        <div>
          <label id="icon" for="email">
            <i class="fa fa-envelope-open"></i>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            ref={register({
              required: "Email required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email is invalid!"
              }
            })}
            onChange={updateField}
          />
          <span class="badge badge-danger">
            {errors.email && errors.email.message}
          </span>
        </div>

        <div>
          <label id="icon" for="password">
            <i class="fa fa-key"></i>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            ref={register({
              required: "Password required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })}
            onChange={updateField}
          />
          <span class="badge badge-danger">
            {errors.password && errors.password.message}
          </span>
        </div>

        <div>
          <label id="icon" for="confirm">
            <i class="fa fa-key"></i>
          </label>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            ref={register({
              required: "Confirm Password required!",
              validate: value =>
                value === watch().password || "Password did not match"
            })}
            onChange={updateField}
          />
          <span class="badge badge-danger">
            {errors.confirm && errors.confirm.message}
          </span>
        </div>

        <button
          disabled={
            !formState.dirty || (formState.dirty && !formState.isValid)
            // onClick={event => window.location.href = '/login'}
          }
          type="submit"
          class="btn btn-primary"
        >
          Sign up
        </button>
        <hr />
        <div class="crtacc">
          <Link to="/login">Already have account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
