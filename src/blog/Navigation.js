import React from "react";
import { Link } from "react-router-dom";
//import "../assets/navbar"
// require("../assets/navbar.css");

export default function Navigation() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  function logout() {
    sessionStorage.setItem("persisted_state_hook:token", "");
    sessionStorage.clear();
    window.location.replace("/login");
  }

  if (!token) {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">
            BLOG TASK
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/">
                  <a class="nav-link">Article</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/login">
                  <a class="nav-link">Login</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/register">
                  <a class="nav-link">Register</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else if (token.token.admin === false) {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">
            BLOG TASK
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active"></li>
              <li class="nav-item">
                <Link to="/getarticleuser">
                  <a class="nav-link">Dashboard</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/getarticleuserid">
                  <a class="nav-link">My Article</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link onClick={logout}>
                  <a class="nav-link">Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else if (token.token.admin === true) {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">
            BLOG TASK
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link to="/homeadmin">
                  <a class="nav-link">Dashboard</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/getarticle">
                  <a class="nav-link">Article</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/getcomment">
                  <a class="nav-link">Comment</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/getuser">
                  <a class="nav-link">User</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link onClick={logout}>
                  <a class="nav-link">Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
