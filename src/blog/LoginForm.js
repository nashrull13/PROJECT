import React, { useState } from "react";
import axios from "axios";
import createPersistedState from "@plq/use-persisted-state";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";

import "../assets/login.css";

export default function Login() {
  const [usePersisted] = createPersistedState("token", window.sessionStorage);
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [token, getToken] = usePersisted("token", "");

  const [admin, setAdmin] = useState({
    redirect: true
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/login", {
        username: form.username,
        password: form.password
      });
      getToken(result.data);
      setAdmin(result.data.admin);
      // console.log(result.data.accessToken)

      // if (result.status === 200) {
      //   alert("Login Success!");

      // } else {
      //   throw new Error("Failed to Login");
      // }
    } catch (err) {
      console.log(err);
      alert(err.response.data.reason);
    }
  };

  const UpdateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (admin === true) {
    window.location.replace("/homeadmin");
  } else if (admin === false) {
    window.location.replace("/getarticleuser");
  }

  return (
    <div class="wrapper animated bounce">
      <h1>Login First</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label id="icon" for="username">
          <i class="fa fa-user"></i>
        </label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={UpdateField}
        />
        <label id="icon" for="password">
          <i class="fa fa-key"></i>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={UpdateField}
        />
        <input type="submit" value="Sign In" />
        <hr />
        <div class="crtacc">
          <Link to="/register">Create Account</Link>
        </div>
      </form>
    </div>
  );
}
