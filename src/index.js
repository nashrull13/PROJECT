import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./layouts/Main";
import Notfound from "./blog/NotFound";
import Login from "./blog/LoginForm";
import Register from "./blog/Register";
import GetArticle from "./blog/GetArticle";
import HomeUser from "./blog/HomeUser";
import HomeAdmin from "./blog/HomeAdmin";
import UpdateArticle from "./blog/UpdateArticle";
import GetUser from "./blog/GetUser";
import GetComment from "./blog/GetComment";
import PostArticle from "./blog/PostArticle";
import GetArticleUser from "./blog/GetArticleUser";
import GetArticleUserId from "./blog/GetArticleUserId";
import ViewArticle from "./blog/ViewArticle";
import AddComment from "./blog/PostComment";
import HomeGuess from "./blog/HomeGuess";
import ViewArticleGuess from "./blog/ViewArticleGuess";

// console.log(token);

const token = JSON.parse(sessionStorage.getItem("persisted_state_hook:token"));

const routing = (
  <Router>
    <Switch>
      <Main>
        {(() => {
          if (!token) {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={HomeGuess} />
                  <Route path="/login" component={Login} />
                  <Route
                    path="/viewarticleguess/:id"
                    component={ViewArticleGuess}
                  />
                  <Route path="/register" component={Register} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === false) {
            return (
              <>
                <Switch>
                  <Route
                    exact
                    path="/getarticleuser"
                    component={GetArticleUser}
                  />
                  <Route path="/viewarticle/:id" component={ViewArticle} />
                  <Route
                    path="/getarticleuserid"
                    component={GetArticleUserId}
                  />
                  <Route path="/postarticle" component={PostArticle} />
                  <Route path="/postcomment/:id" component={AddComment} />
                  <Route path="/login" component={Login} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === true) {
            return (
              <>
                <Switch>
                  <Route exact path="/homeadmin" component={HomeAdmin} />
                  <Route path="/getarticle" component={GetArticle} />
                  <Route path="/getuser" component={GetUser} />
                  <Route path="/getcomment" component={GetComment} />
                  <Route path="/postcomment/:id" component={AddComment} />
                  <Route path="/viewarticle/:id" component={ViewArticle} />
                  <Route path="/updatebook/:id" component={UpdateArticle} />

                  <Route path="/login" component={Login} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          }
        })()}
      </Main>
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
