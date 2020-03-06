import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ViewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      comments: [
        {
          user: {
            username: ""
          }
        }
      ]
    };
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  getArticleDetails() {
    let articleId = this.props.match.params.id;
    axios
      .get(`http://localhost:8080/comments/${articleId}`)
      .then(response => {
        this.setState(
          {
            title: response.data.data.title,
            content: response.data.data.content,
            comments: response.data.data.comments
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  onDelete(e, id) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/comments/${id}`)
      .then(alert("Comment deleted!"));
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div class="article-title mx-2">{this.state.title}</div>
        <div class="article-content mx-2">{this.state.content}</div>
        <div class="comment-title mx-2">Comments</div>

        {this.state.comments.map(comments => {
          return (
            <>
              <div class="comment-content">
                From:<b> {comments.user.username} </b> <br />
                {comments.content}
                {(() => {
                  const role = localStorage.getItem("jwtRole");
                  const userId = localStorage.getItem("jwtId");

                  if (
                    String(comments.userId) === String(userId) ||
                    role === "true"
                  ) {
                    return (
                      <button
                        className="button btn-danger btn-sm mb-2"
                        onClick={e => this.onDelete(e, comments.id)}
                      >
                        Delete Comment
                      </button>
                    );
                  }
                })()}
              </div>
              <br></br>
            </>
          );
        })}

        {(() => {
          const role = localStorage.getItem("jwtRole");
          let articleId = this.props.match.params.id;

          if (role) {
            return (
              <>
                <Link to={"/postcomment/" + articleId}>
                  <button className="button btn-success btn-sm btn-block mb-3">
                    Post Comment
                  </button>
                </Link>

                <button
                  className="button btn-warning btn-sm btn-block"
                  onClick={this.props.history.goBack}
                >
                  Return
                </button>
              </>
            );
          } else {
            return (
              <button
                className="button btn-warning btn-sm btn-block"
                onClick={this.props.history.goBack}
              >
                Return
              </button>
            );
          }
        })()}
      </>
    );
  }
}

export default ViewArticle;
