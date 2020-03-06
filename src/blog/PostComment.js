import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const AddComment = props => {
  const [form, setValues] = useState({
    content: ""
  });

  const printValues = e => {
    e.preventDefault();
    console.log(form.content);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
      );
      console.log(token.token.id_user);

      const result = await axios.post(
        "http://localhost:8080/comment/" +
          props.match.params.id +
          "/" +
          token.token.id_user,
        {
          content: form.content
        }
      );
      // window.location.reload();
      if (result.status === 201) {
        alert("Comment Added sucessfuly!");
        window.location.replace("/viewarticle/" + props.match.params.id);
      } else {
        throw new Error("Failed to add comment!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container">
      <div className="cardkomen">
        <center>
          <div className="titlekomen">
            <h2>
              <strong>Add Comment</strong>
            </h2>
          </div>
        </center>
        <form id="myform" onSubmit={handleSubmit} className="px-4 ma">
          <label className="labelkomen">Your Comment : </label>
          <textarea
            className="form-control"
            value={form.content}
            name="content"
            id="textarea"
            onChange={updateField}
            rows="4"
            cols="50"
          />
          {/* <div id="textarea_feedback"></div> */}
          <br />
          <button id="btnsubmit" className="mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddComment;
