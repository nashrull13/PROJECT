import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import article from "./article.svg";
import chat from "../assets/comment.png";

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
      user: [
        {
          id_user: "",
          name: ""
        }
      ],
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
          name: response.data.data.user.name,
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
  onDelete(e, id) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/comment/${id}`)
      .then(alert("Comment deleted!"));
    window.location.reload(false);
  }

  render() {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    return (
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h1 class="mt-4">{this.state.title}</h1>
            <p class="lead">{/* by
              <a>{this.state.name}</a> */}</p>
            <hr />
            <p>by {this.state.name}</p>
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
              <div class="card-header">
                <a>Comments</a>
              </div>
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
            {/* <div class="card my-4">
              <h5 class="card-header">Leave a Comment:</h5>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <textarea class="form-control" rows="3"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div> */}
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

                    {(() => {
                      const admin = token.token.admin;
                      const id_user = token.token.id_user;

                      if (
                        String(comments.id_user) === String(id_user) ||
                        String(admin) === "true"
                      ) {
                        return (
                          <div class="col-md-2 mb-1">
                            <button
                              className="button btn-danger btn-sm mb-2"
                              onClick={e =>
                                this.onDelete(e, comments.id_comment)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })()}

                    {/* <button
                  className="button btn-danger btn-sm mb-2"
                  onClick={e => this.onDelete(e, komentars.id)}
                >
                  <i class="fa fa-trash"></i>
                  Hapus
                </button> */}
                  </div>
                </div>
              );
            })}
            {(() => {
              if (token.token.accessToken) {
                return (
                  <div class="col-md-3 mb-3">
                    <Link to={"/postcomment/" + this.props.match.params.id}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        width="3px"
                      >
                        <i className="fa fa-plus"> </i>&nbsp;&nbsp; Add Comment
                      </button>
                    </Link>
                  </div>
                );
              } else if (!token.token.accessToken) {
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}
