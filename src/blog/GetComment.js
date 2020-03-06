import React, { useState, useMemo } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

function GetComment() {
  const [data, setData] = useState([]);
  const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
    ); 

  useMemo(() => {
    const fetchData = async () => {      
      const result = await axios({
        method: "get",
        url: "http://localhost:8080/comment",
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
    // console.log(data);
  }, []);
    console.log(data);
        
  async function deleteUser(id) {
    await axios({
      method: "delete",
      url: `http://localhost:8080/user/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: data
    })
    window.location.reload(false);
  } 
  
  function deleteConfirm(name, id_user) {
    confirmAlert({
      title: "Alert",
      message: "Are you sure to remove " + name + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id_user)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  async function EnableComment(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "put",
        url: `http://localhost:8080/commenttrue/${id}`,
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


  async function DisableComment(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "put",
        url: `http://localhost:8080/commentfalse/${id}`,
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
          <td>{data.content}</td>
          <td>{data.user.name}</td>
         
                             
          <td>
            {(() => {             
                if (data.status === true) {
                  return (
                    <>
                      <button
                      type="button"
                      className="btn btn-success  btn-sm mt-1"
                      value="show"
                        onClick={() => DisableComment(data.id_comment)}
                      >Show</button>
                    </>
                  )
                } else if (data.status === false) {
                  return (
                    <>
                      <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      value="Hide"
                        onClick={() => EnableComment(data.id_comment)}
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
                      onClick={() => deleteConfirm(data.name, data.id_user)}
                    >
                      <i className="fa fa-trash"></i>
                      
                    </button>
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
          <th scope="col">Content</th>
          <th scope="col">Author</th>
          <th scope="col">Status</th>
          <th scope="col">Delete</th>

    
              
        </tr>
      </thead>
       <tbody>{render()}</tbody>        
    </table>
  );
}
export default GetComment;
