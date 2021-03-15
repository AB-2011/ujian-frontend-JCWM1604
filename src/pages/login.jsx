import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../component/header';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
    LoginAction,
    LoginActionThunk,
    ResetActionthunk
} from "../redux/actions";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import Loader from "react-loader-spinner";
import { withStyles } from "@material-ui/core/styles";
import Button from '../component/button';


const Style = {
    root: {
        "& label.Mui-focused": {
            color: "#655143",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#655143",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#655143",
            },
            "&:hover fieldset": {
                borderColor: "#655143",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#655143",
            },
        },
    },
};


class Login extends Component {
    state = {
        isVisible: false,
        email: "",
        password: "",
    }

    toggle = () => {
        this.setState({ isVisible: !this.state.isVisible });
    };

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onLoginSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.email);
        const { email, password } = this.state;
        var data = {
            email: email,
            password,
        };
        this.props.LoginActionThunk(data);
    }

    render() {
        const { classes } = this.props;
        if (this.props.dataUser.islogin) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <Header />
                <div className="container mt-5 py-5">
                    <div className="row" style={{ height: "70vh" }}>
                        <div className="col-md-7">
                            <img src="https://images.unsplash.com/photo-1581387490232-2181c3736353?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80" alt="login" width="100%" height="100%" />
                        </div>
                        <div className="rounded col-md-5 d-flex justify-content-center align-items-center shadow">
                            <form onSubmit={this.onLoginSubmit} style={{ width: "50%" }}>
                                <h1 style={{ color: "#655143" }}>Login</h1>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control my-3"
                                    name="email"
                                    onChange={this.onInputChange}
                                    value={this.state.email}

                                />
                                <div className="d-flex">
                                    <input
                                        type={this.state.isVisible ? "text" : "password"}
                                        className=" form-control  mt-3"
                                        placeholder="password"
                                        name="password"
                                        onChange={this.onInputChange}
                                        value={this.state.password}
                                    />
                                    <div style={{ paddingTop: 20, paddingLeft: 5 }}>
                                        {this.state.isVisible ? (
                                            <AiFillEye
                                                style={{ fontSize: "1.5em", color: "#fbab7e" }}
                                                onClick={this.toggle}
                                            />
                                        ) : (
                                            <AiFillEyeInvisible
                                                style={{ fontSize: "1.5em", color: "#9f9f9f" }}
                                                onClick={this.toggle}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="mt-3 ">
                                    {this.props.dataUser.loading ? (
                                        <Loader type="Hearts" color="#655143" />
                                    ) : (
                                        <Button submit={true} className="px-4 py-2 w-50 ">
                                            Login
                                        </Button>
                                    )}
                                </div>
                                {this.props.dataUser.error ? (
                                    <Alert color="danger mt-2">
                                        {this.props.dataUser.error}{" "}
                                        <span
                                            className="float-right"
                                            onClick={this.props.ResetActionthunk}
                                        >
                                            X
                    </span>
                                    </Alert>
                                ) : null}
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const MaptstatetoProps = (state) => {
    return {
        dataUser: state.Auth,
    };
};

export default withStyles(Style)(
    connect(MaptstatetoProps, {
        LoginAction,
        LoginActionThunk,
        ResetActionthunk,
    })(Login)
);