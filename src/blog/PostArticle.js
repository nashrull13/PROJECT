import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router-dom";

const PostArticle = props => {
    const { register, handleSubmit } = useForm();

    const [redirects, setRedirect] = useState({
        redirect: false
      });
       
     const [form, setValues] = useState({
        title: "",
        content: "",
        id_user: "" 
    });


    const handleeSubmit = async e => {
        const token = JSON.parse(
            sessionStorage.getItem("persisted_state_hook:token")
        );
       
        try {
            const result = await axios({
                method: "post",
                url: "http://localhost:8080/article",
                data: {
                    title: form.title,
                    content: form.content,
                    id_user: token.token.id_user
                },
                headers: {
                    Authorization: token.token.accessToken
                }
                
            }             
            );     
            // setData(result.data);
            

            if (result.status === 201) {
                alert("Article has been create!");
                window.location.replace("/getarticleuserid");                
            } else {
                throw new Error("Failed to create article!");
            }
            
        }
        
        catch (err) {
            console.log(err);
        }
    };

    if (redirects.redirect === true) {
        return <Redirect to={"/homeuser"} />;
      }
    

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container">
            <div className="cardregis">
                <div className="title">Add Article</div>
                    <form onSubmit={e => e.preventDefault()}>           

            <div className="container mt-5">
                <div class="form-group">
                    <label for="nama">Title</label>
                    <input
                        name="title"
                        type="text"
                        class="form-control"
                        value={form.title}
                        ref={register({
                            required: "Required"
                        })}
                        onChange={updateField}
                    />

                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea
                        name="content"
                        class="form-control"
                        type="text"
                        rows="15"
                        value={form.content}
                        ref={register({
                            required: "Required"
                        })}
                        onChange={updateField}
                    />

                </div>                               
                <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={handleSubmit(handleeSubmit)}>
                    
                                    Submit
        </button>
            </div>
                </form>
            </div>
        </div>
    );
};

export default PostArticle;
