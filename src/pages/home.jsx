import React, { Component } from "react";
import Header from "../component/header";
import Slider from "react-slick"; //untk image slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Button from "../component/button";
import axios from "axios"
import { API_URL, currencyFormatter } from "../helper";
import { Link } from "react-router-dom";


class Home extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get(`${API_URL}/products`).then((res) => {
            this.setState({ data: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderProducts = () => {
        return this.state.data.map((val, index) => {
            return (
                <div key={index} className="col-md-3 p-2">
                    <Card>
                        <CardImg top width="100%" src={val.img} />
                        <CardBody>
                            <CardTitle tag="h5">{val.name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{currencyFormatter(val.price)} </CardSubtitle>
                            {/* disini state diisi dngn val, krn val sudah merupaka object */}
                            <Link to={{ pathname: `/product/${val.id}`, state: { product: val } }}>
                                <Button className="w-100 py-2 mt-3">Product Details</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }


    render() {
        // const settings = {
        //   className: "center",
        //   centerMode: true,
        //   infinite: true,
        //   centerPadding: "60px",
        //   slidesToShow: 1,
        //   speed: 500,
        //   dots: true

        // };

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div>
                <Header />
                <div className="container-fluid mt-5">
                    <Slider {...settings} autoplay>
                        <div>
                            <div className="px-2"  >
                                <img src="https://im.berrybenka.com/assets/promo_page/Coll1-InternationalWomanDay-Buy1Get1Free-ShoesBagsEdition-2000x900_YJV4O.gif" alt="slide1" width="100%" height="100%" />
                            </div>
                        </div>
                        <div>
                            <div className="px-2" >
                                <img src="https://im.berrybenka.com/assets/promo_page/Coll1-Retro-Femme-2000x900_PLW1O.jpg" alt="slide2" width="100%" height="100%" />
                            </div>
                        </div>
                        <div>
                            <div className="px-2" >
                                <img src="https://im.berrybenka.com/assets/promo_page/Coll1-MODEST-BOTANICAL-RETRO-2000x900_T7GK5.jpg" alt="slide3" width="100%" height="100%" />
                            </div>
                        </div>
                        <div>
                            <div className="px-2" >
                                <img src="https://im.berrybenka.com/assets/promo_page/Coll1-Easy-Breezy-2000x900_3Q9TU.jpg" alt="slide4" width="100%" height="100%" />
                            </div>
                        </div>
                    </Slider>
                </div>
                <section className="shadow d-flex justify-content-center align-items-center mb-5 mt-5 py-5 garis garisbwh">
                    <h1>
                        MEET OUR POPULAR COLLECTIONS
            </h1>
                </section>
                <section className="container mb-4">

                    <div className="row">
                        {this.renderProducts()}
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
