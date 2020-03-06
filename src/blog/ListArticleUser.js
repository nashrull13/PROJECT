import React, { useState, useMemo } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

function ListArticleUser() {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/article" + id,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.user);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
    // console.log(data);
  }, []);
  console.log(data);

  async function ViewArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "get",
        url: `http://localhost:8080/user/${id}`,
        headers: {
          Authorization: token.token.accessToken
        },
        data: {
          status: true
        }
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  async function DisableUser(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "put",
        url: `http://localhost:8080/user/${id}`,
        headers: {
          Authorization: token.token.accessToken
        },
        data: {
          status: false
        }
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  const render = () => {
    let no = 1;
    return data.map((data, id) => {
      return (
        <tr key={id}>
          <td>{no++}</td>
          <td>{data.name}</td>
          <td>{data.username}</td>
          <td>{data.email}</td>

          <td>
            {(() => {
              if (data.status === true) {
                return (
                  <>
                    <input
                      type="submit"
                      value="Active"
                      onClick={() => DisableUser(data.id)}
                    />
                  </>
                );
              } else if (data.status === false) {
                return (
                  <>
                    <input
                      type="submit"
                      value="Inactive"
                      onClick={() => EnableUser(data.id)}
                    />
                  </>
                );
              }
            })()}
          </td>
          <td>
            <Link to={"/updateuser" + data.id}>
              <button type="button" className="btn btn-secondary btn-sm mt-1">
                <i className="fa fa-pencil"></i>
              </button>
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger  btn-sm mt-1"
              onClick={() => deleteConfirm(data.name, data.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
          <td>
            <Link to={"/getorder/" + data.id}>
              <button type="button" className="btn btn-secondary btn-sm mt-1">
                <i className="fa fa-address-card"></i>
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <table class="table table-dark">
      <thead class="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Edit </th>
          <th scope="col">Delete </th>
          <th scope="col">List Order </th>
        </tr>
      </thead>
      <tbody>{render()}</tbody>
    </table>
  );
}
export default ListArticleUser;
