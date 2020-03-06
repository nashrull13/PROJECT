import React, { Component } from "react";
import axios from "axios";

export default class UpdateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      content: "",
      status: ""
      
    };
  }

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    const result = await axios({
      method: "get",
      url: "http://localhost:8080/article/" + id,
      headers: {
        Authorization: token.token.accessToken
      }
    });

    this.setState(result.data.article);

    console.log(result);
  };

  handlerChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
    // console.log(this.state.title);
  };

  handlerSubmit = async e => {
    const id = this.props.match.params.id;
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    e.preventDefault();
    await axios({
      method: "put",
      url: "http://localhost:8080/article/" + id,
      data: this.state,
      headers: {
        Authorization: token.token.accessToken
      }
    });
    alert("Data updated successfuly!");  
    this.props.history.push("/getbook");
  }; 
  render()
  {
    return (
      <div className="container">
        <div className="cardregis">
          <div className="title">Update Article</div>
          <form onSubmit={this.handlerSubmit}>
            <div className="container mt-5">
              <div className="form-group">
                <label>Title </label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.handlerChange}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <input
                  name="content"
                  className="form-control"
                  type="text"
                  value={this.state.content}
                  onChange={this.handlerChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  className="form-control"
                  type="date"
                  value={this.state.status}
                  onChange={this.handlerChange}
                >
                <option>true</option>
                <option>false</option>
                </select>
                
              </div>              
              <button type="submit" value="Submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

