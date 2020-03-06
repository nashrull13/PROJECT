import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import letter from "../assets/article.png";
import { Jumbotron } from "reactstrap";

function GetArticleUser() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const id = token.token.id;
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");

  useMemo(() => {
    const id = token.token.id;
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/article",
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.data);
      setFiltered(result.data.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(data);

  useEffect(() => {
    const results = filtered.filter(res =>
      res.content.toLowerCase().includes(result)
    );
    setData(results);
  }, [result]);

  const onChange = e => {
    setResult(e.target.value);
  };

  const render = () => {
    return data.map((data, id) => {
      return (
        <>
          <link
            href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
          <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
          <link
            rel="stylesheet"
            href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"
          />

          <div class="container">
            <div class="well">
              <div class="media">
                <a class="pull-left">
                  <img class="media-object" src={letter} width="70%" />
                </a>
                <div class="media-body">
                  <h4 class="media-heading">
                    <strong>{data.title}</strong>
                  </h4>
                  <p class="text-right">
                    By <strong>{data.user.name}</strong>
                  </p>
                  <p>{data.content.substr(0, 20)}.....</p>
                  <Link to={"/viewarticle/" + data.id_article}>
                    <a>Read More &rarr;</a>
                  </Link>
                  <ul class="list-inline list-unstyled">
                    <li>
                      <span>
                        <i class="glyphicon glyphicon-calendar"></i>
                        {moment(data.createdAt).format(
                          " DD / MMMM / YYYY"
                        )}{" "}
                      </span>
                    </li>
                    <li>|</li>
                    <span>
                      <i class="glyphicon glyphicon-comment"></i>{" "}
                      {data.comments.length} Comments
                    </span>
                    <li>|</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };
  // const render = () => {

  return (
    <div>
      <div>
        <h2>Search</h2>
        <form class="form-inline d-flex justify-content-center md-form form-sm active-purple active-purple-2 mt-5">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input
            class="form-control form-control-sm ml-3 w-75"
            type="text"
            value={result}
            onChange={onChange}
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div>
        <Jumbotron>
          <h1 className="display-3">Welcome {token.token.name}!</h1>
          <p className="lead">Have a nice day</p>
          <hr className="my-2" />
          <p>just create an article or somewhat</p>
        </Jumbotron>
        <div>{render()}</div>;
      </div>
    </div>
  );
}

export default GetArticleUser;
