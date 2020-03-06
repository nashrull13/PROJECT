import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import article from "./article.svg";
import chat from "../assets/comment.png";
import { Link } from "react-router-dom";

export default class ViewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_article: "",
      title: "",
      content: "",
      status: "",
      id_user: "",
      createdAt: "",
      comments: [
        {
          id_user: "",
          content: "",
          user: {
            id_user: "",
            name: ""
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    let id = this.props.match.params.id;
    axios.get("http://localhost:8080/articlecomment/" + id).then(response => {
      this.setState(
        {
          title: response.data.data.title,
          content: response.data.data.content,
          comments: response.data.data.comments,
          createdAt: response.data.data.createdAt
        },
        () => {
          console.log(this.state);
          console.log(response.data.data);
        }
      );
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h1 class="mt-4">{this.state.title}</h1>
            <p class="lead">{/* by
              <a>{this.state.name}</a> */}</p>

            <hr />

            <p>
              Posted on{" "}
              {moment(this.state.createdAt).format(" DD / MMMM / YYYY")}
            </p>

            <hr />

            <img class="img-fluid rounded" src={article} alt="" width="30%" />

            <hr />

            <p>{this.state.content}</p>
            <hr />

            <div class="card">
              <div class="card-header">Comment</div>
            </div>
            {(() => {
              if (this.state.comments.length === 0) {
                return (
                  <>
                    <center>
                      <div class="card-body mb-2">
                        <strong>No comment added yet</strong>
                      </div>
                    </center>
                  </>
                );
              }
            })()}

            {this.state.comments.map(comments => {
              return (
                <div class="media mb-4">
                  <img
                    class="d-flex mr-3 rounded-circle"
                    src={chat}
                    width="8%"
                    alt=""
                  />
                  <div class="media-body">
                    <h5 class="mt-0">{comments.user.name}</h5>
                    {comments.content}
                    <br />
                    <small>
                      At :{" "}
                      {moment(comments.createdAt).format(" DD / MMMM / YYYY")}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
