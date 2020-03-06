import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import letter from "../assets/article.png";

function HomeGuess() {
  const [data, setData] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/articleguess"
      });
      setData(result.data.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(data);

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
                <a class="pull-left" href="#">
                  <img class="media-object" src={letter} width="70%" />
                </a>
                <div class="media-body">
                  <h4 class="media-heading">
                    <strong>{data.title}</strong>
                  </h4>
                  <p class="text-right">
                    By <strong>{data.user.name}</strong>
                  </p>
                  <p>{data.content.substr(0, 50)}.....</p>
                  <Link to={"/viewarticleguess/" + data.id_article}>
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

  return <div>{render()}</div>;
}
export default HomeGuess;
