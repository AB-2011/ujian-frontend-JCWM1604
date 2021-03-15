import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { LoginAction } from "./redux/actions";
import NotFound from "./pages/notfound";
import { connect } from "react-redux";
import Home from './pages/home';
import Login from './pages/login';
import { API_URL } from "./helper";
import ProductDetail from "./pages/productdetail";
import Cart from "./pages/cart";
import History from "./pages/history";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Loading from "./component/loading";


import "react-toastify/dist/ReactToastify.min.css";


class App extends Component {
  state = {
    isLoading: true,

  }

  componentDidMount() {
    let id = localStorage.getItem("id");
    axios
      .get(`${API_URL}/users/${id}`)
      .then((res) => {
        console.log(res);
        this.props.LoginAction(res.data);
        //* digantikan difinally this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        //* digantikan difinally this.setState({ isLoading: false });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.props.dataUser.role === "admin") {
      return (
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:idprod" component={ProductDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
          <ToastContainer />
        </div>
      );
    }
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:idprod" component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/history" exact component={History} />
          <Route path="/login" exact component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};
export default connect(MaptstatetoProps, { LoginAction })(App);