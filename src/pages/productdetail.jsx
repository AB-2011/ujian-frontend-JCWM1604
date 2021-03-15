import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "../component/header";
import axios from "axios";
import { API_URL, currencyFormatter } from '../helper';
import Loading from '../component/loading';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
import Button from "../component/button";
import { CartAction } from './../redux/actions';
import { toast } from "react-toastify";


class ProductDetail extends Component {
    state = {
        product: {},
        loading: true,
        qty: 1
    }
    componentDidMount() {
        // match params untk dapetin id nya di db
        var idprod = this.props.match.params.idprod
        var data = this.props.location.state
        // klo link diproduct detail diakses langsung, diketik sendiri
        // nanti dptnya undifined, oleh krn itu kita buat kondisi
        // klo dia undifined baru diaxios
        if (!data) { //jdi klo datanya ada, dia jdi false, klo false dia true
            axios.get(`${API_URL}/products/${idprod}`).then((res) => {
                this.setState({ product: res.data })
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                this.setState({ loading: false })
            })
        } else {
            // klo kita dpt datanya true
            this.setState({ product: data.product, loading: false }) //product dari state yg link btn detail
        }
    }

    onQtyClick = (operator) => {
        if (operator === 'tambah') {
            var hasil = this.state.qty + 1
            if (hasil > this.state.product.stock) {
                toast("melebihi stock ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                this.setState({ qty: this.state.qty + 1 })
            }
        } else {
            var hasil = this.state.qty - 1
            if (hasil < 1) {
                toast("tidak boleh kurang dari 1 ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                this.setState({ qty: this.state.qty - 1 })
            }
        }
    }

    onAddToCartClick = () => {
        // klo dia admin, atau blm login gabisa beli
        if (this.props.dataUser.role === "admin" || this.props.dataUser.islogin === false) {
            toast("tidak boleh beli", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // tujuannya mau edit isi cart, masukin product ke cart
            // jdi harus diget
            // klo dia '/' dia object, klo '?' dia array
            let id = this.props.dataUser.id
            let idprod = this.state.product.id
            let stock = this.state.product.stock
            axios.get(`${API_URL}/users/${id}`).then((res) => {
                var cart = res.data.cart //cart adlh array
                //cara agar hanya qty nya saja yg berubah
                let findIdx = cart.findIndex((val) => val.id == idprod)
                if (findIdx < 0) {
                    let data = {
                        ...this.state.product,
                        qty: this.state.qty,
                    }
                    cart.push(data)
                    // update data
                    axios.patch(`${API_URL}/users/${id}`, { cart: cart }).then((res1) => {
                        this.props.CartAction(res1.data.cart)
                        toast("berhasil dimasukkan ke cart", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    let qtyakhir = cart[findIdx].qty + this.state.qty
                    if (qtyakhir > stock) {
                        var qtyablebuy = stock - cart[findIdx].qty
                        toast("barang dicart melebihi stock, barang yang bisa dibeli hanya " + qtyablebuy, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    } else {
                        cart[findIdx].qty = qtyakhir //cart disini array, krn di db.json array
                        //cart dibwh ekspektasi object, krn untk axios.patch, post terima parameter kedua berupa object
                        //oleh krn itu diubah dri array ke object
                        axios.patch(`${API_URL}/users/${id}`, { cart: cart }).then((res1) => {
                            this.props.CartAction(res1.data.cart)
                            toast("cart berhasil ", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }).catch((err) => {
                            console.log(err)
                        })
                    }

                }
                // habis dipush kita edit cartnya
                //cart disini ekspektasi data yg dikirim harus object

            }).catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }
        return (
            <div>
                <Header />
                <div className="container">
                    <Breadcrumb className="bg-transparent mt-5">
                        <BreadcrumbItem ><Link to="/"><span style={{ color: "#b29f94" }}>Home</span> </Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/products"><span style={{ color: "#b29f94" }}>Product</span></Link></BreadcrumbItem>
                        <BreadcrumbItem active style={{ color: "#655143", fontWeight: "bold" }}>{this.state.product.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <img src={this.state.product.img} alt="" width="100%" height="100%" />
                        </div>
                        <div className="col-md-6 mt-4">
                            <div className="text-center">
                                <h3>{this.state.product.name}</h3>
                            </div>
                            <div className="text-center display-5">
                                {this.state.product.description}
                            </div>
                            <div className="text-center mt-4 mb-4">
                                <h4 style={{ color: "#f36795" }}>{currencyFormatter(this.state.product.price * this.state.qty)}</h4>
                            </div>

                            <div className="d-flex mt-4" style={{ paddingLeft: "25px" }}>
                                <Button className="py-2 px-2" style={{ fontSize: 35, width: "40px" }} onClick={() => this.onQtyClick('kurang')}>-</Button>
                                <div className="w-25 d-flex justify-content-center align-items-center" style={{ fontSize: 35 }}>
                                    {this.state.qty}
                                </div>
                                <Button className="py-2 px-2" style={{ fontSize: 35, width: "40px" }} onClick={() => this.onQtyClick('tambah')}>+</Button>

                            </div>
                            <div className="mt-5 d-flex justify-content-center align-items-center" style={{ paddingLeft: "25px" }} >
                                <Button className="w-50 py-2" onClick={this.onAddToCartClick}>ADD TO CART</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const MapstatetoProps = (state) => {
    return {
        dataUser: state.Auth
    }
}

export default connect(MapstatetoProps, { CartAction })(ProductDetail);