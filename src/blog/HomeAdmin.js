import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Jumbotron } from "reactstrap";

export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentWillMount() {
        if (sessionStorage.getItem("persisted_state_hook:token")) {
            console.log("Call User Feed");
        } else {
            this.setState({ redirect: true });
        }
    }

    render() {
        console.log(this.state);
        console.log(sessionStorage.getItem("auth"));

        if (this.state.redirect) {
            return <Redirect to={"/login"} />;
        }
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Welcome Admin!</h1>
                    <p className="lead">The simple page with much effort</p>
                    <hr className="my-2" />
                    <p>just go to the next page</p>
                </Jumbotron>
            </div>
        );
    }
}
