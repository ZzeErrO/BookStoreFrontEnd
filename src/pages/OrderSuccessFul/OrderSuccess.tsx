import React, { Component } from 'react'
import './OrderSuccess.css'

import Button from '@material-ui/core/Button';

import Success from '../../assets/order.png'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { Redirect } from "react-router-dom";

interface IProps {
}

interface IState {
    redirect?: any
}

export default class OrderSuccess extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    toHome = () => {
        this.setState({ redirect: "/bookStore" });
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <Header />
                <div className="body3">
                    <div className="inimage">
                        <img className="image3" src={Success} alt="order success" />
                    </div>
                    <div className = "faltuinfo">
                    <div>hurray!!! your order is confirmed</div>
                    <div>the order id is #123456 save the order id for</div>
                    <div>further communication..</div>
                    </div>
                    <div>
                        <div className = "table">
                            <div>Email us</div>
                            <div>Contact us</div>
                            <div>Address</div>
                        </div>
                        <div className = "justdoingrow">
                        <div className = "columneach">
                            <div>admin@bookstore.com</div>
                        </div>
                        <div className = "columneach">
                            <div>+91 8163475881</div>
                        </div>
                        <div className = "columneach2">
                            <div>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</div>
                        </div>
                        </div>
                    </div>

                    <Button onClick = {this.toHome} size = "small" variant="contained" color="primary">
                        Continue Shopping
                    </Button>
                </div>
                <Footer />
            </div>
        )
    }
}
