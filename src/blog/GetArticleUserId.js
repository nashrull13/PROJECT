import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

function GetArticleUserId() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const id = token.token.id;

  useMemo(() => {
    const id = token.token.id_user;
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/articleuser/" + id,
        headers: {
          Authorization: token.token.accessToken
        }
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

  async function deleteArticle(id) {
    await axios({
      method: "delete",
      url: `http://localhost:8080/article/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: data
    });
    window.location.reload(false);
  }

  function deleteConfirm(title, id_article) {
    confirmAlert({
      title: "Alert",
      message: "Are you sure to remove " + title + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteArticle(id_article)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  const render = () => {
    let no = 1;
    return data.map((data, id) => {
      return (
        <tr key={id}>
          {/* <SearchField
            placeholder="Search item"
            onSearchClick={onSearchClick}
          /> */}
          <td>{no++}</td>
          <td>{data.title}</td>
          <td>{data.content}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger  btn-sm mt-1"
              onClick={() => deleteConfirm(data.title, data.id_article)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
          <td>
            <Link to={"/viewarticle/" + data.id_article}>
              <button type="button" className="btn btn-primary  btn-sm mt-1">
                <i className="fa fa-eye"></i>
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div class="col-md-2 mb-1">
        <Link to={"/postarticle/"}>
          <button type="button" className="btn btn-success  btn-sm mt-1">
            <i className="fa fa-plus"></i> Add Article
          </button>
        </Link>
      </div>

      <table class="table table-dark">
        <thead class="thead-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Delete</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>{render()}</tbody>
      </table>
    </div>
  );
}
export default GetArticleUserId;
