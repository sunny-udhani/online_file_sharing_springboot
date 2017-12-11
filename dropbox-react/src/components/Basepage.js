import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Signin from "./Signin";
import Home from "./Home";
import '../App.css';

import AlertContainer from 'react-alert';

import {alertOptions, showAlert} from "../alertConfig";




class Basepage extends Component {


    constructor() {
        super();
        this.state = {
           isLoggedIn: false,
            message: '',
            username: '',
            images: []
        };
    }

    handleSubmit = (userdata) => {
        console.log('userdata before do:',userdata.username);

        if (userdata.username === "") {
            showAlert("Enter username used for sign in", "error", this);
            return;
        }

        if (userdata.password === "") {
            showAlert("Enter password used for sign in", "error", this);
            return;
        }

        API.doLogin(userdata)
            .then((data) => {
                console.log(data);
                if (data.status === 401) {
                    console.log('inside 401');

                    this.setState({
                        isLoggedIn: false,
                        message: "Login failed, please sign in again"
                    });

                    showAlert("Incorrect username/password", "error", this);

                    this.props.history.push("/");
                } else {

                    showAlert("Logged In successfully", "info", this);

                        this.props.history.push("/home");
                }
            });
    };

    handleCreateAccount = (userdata) => {

        if (userdata.email === "") {
            showAlert("Enter username for sign up", "error", this);
            return;
        }

        if (userdata.password === "") {
            showAlert("Enter password for sign up", "error", this);
            return;
        }
        if (userdata.firstname === "") {
            showAlert("Enter First Name for sign up", "error", this);
            return;
        }
        if (userdata.lastname === "") {
            showAlert("Enter Last Name for sign up", "error", this);
            return;
        }
        if (userdata.email !== "") {
            API.doSignUp(userdata)
                .then((status) => {
                    if (status === 201) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Something's wrong, Try again..!!"
                        });

                    } else {
                        showAlert("Sign Up successfully", "info", this);
                        this.props.history.push("/");
                    }
                });
        }
    };

    handleLogout = () => {
        API.doLogout()
            .then((status)=> {

                        this.props.history.push("/");
                        this.props.history.push("/signin");
                }
            );


    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Signin handleCreateAccount={this.handleCreateAccount} handleSubmit={this.handleSubmit}/>

                    </div>
                )}/>
              <Route exact path="/signin" render={() => (
                    <div>
                        <Signin handleCreateAccount={this.handleCreateAccount} handleSubmit={this.handleSubmit}
                        />

                    </div>
                )}/>
              <Route exact path="/home" render={() => (
                    <div>
                    <Home handleLogout={this.handleLogout} currentUser={this.state.username}/>
                    </div>

                )}/>
                <AlertContainer ref={a => this.msg = a} {...alertOptions}/>

            </div>
        );
    }
}

export default withRouter(Basepage);
