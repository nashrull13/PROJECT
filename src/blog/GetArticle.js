import React, { useState, useMemo } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import SearchField from "react-search-field";

import "../assets/table.css"

function GetArticle() {
  
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  useMemo(() => {
    const fetchData = async () => {   
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/articleadmin",
        headers: {
          Authorization: token.token.accessToken
        }
      })
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
    })
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

  async function EnableArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "put",
        url: `http://localhost:8080/article/${id}`,
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


  async function DisableArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "put",
        url: `http://localhost:8080/article/${id}`,
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
          {/* <SearchField
            placeholder="Search item"
            onSearchClick={onSearchClick}
          /> */}
          <td>{no++}</td>
          <td>{data.title}</td>
          <td>{data.content}</td>
          <td>
            {(() => {            
                if (data.status === true) {
                  return (
                    <>
                      <button
                      type="button"
                      className="btn btn-success  btn-sm mt-1"
                      value="Show"
                        onClick={() => DisableArticle(data.id_article)}
                      >show</button>
                    </>
                  );
                } else if (data.status === false) {
                  return (
                    <>
                      <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      value="Hide"
                        onClick={() => EnableArticle(data.id_article)}
                      >Hide</button>
                    </>
                  );
                }
              
            })()}
          </td>
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
                    <Link to={"/viewarticle/"+ data.id_article}>
                    <button
                      type="button"
                      className="btn btn-primary  btn-sm mt-1"
                      >  

                      <i className="fa fa-eye"></i>
                      
                    </button></Link>
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
          <th scope="col">Title</th>
          <th scope="col">Content</th>        
          <th scope="col">Status</th>
          <th scope="col">Delete</th>
          <th scope="col">View</th>  
        </tr>
      </thead>
       <tbody>{render()}</tbody>        
    </table>
  );
}
export default GetArticle;
