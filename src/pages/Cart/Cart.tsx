import React, { Component } from 'react'

import './Cart.css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Button from '@material-ui/core/Button';

import { Redirect } from "react-router-dom";

import Userservice from '../../services/userservice';

import Header from '../../components/HeaderFooter/Header';
import Footer from '../../components/HeaderFooter/Footer';

import book1 from '../../assets/book1.png';

const axios_service = new Userservice();

interface IProps {
}

interface IState {
    notes?: any,
    redirect?: any,
    openDropDown?: boolean
}

export default class Cart extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false
        }

    }

    componentDidMount() {
        this.GetCart();
    }

    GetCart = () => {
        axios_service.Getcart().then((result) => {
            console.log(result.data.book);
            this.setState({ notes: result.data.book });
            console.log(this.state.notes);
            console.log(this.state.notes.bookName[0]);
        }).catch(() => {

        })
    }

    toCart = () => {
        this.setState({ redirect: "/cart" });
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (

            <div>
                <Header/>

                <div className="Body">
                    <div className="Title"><a href ="http://localhost:3000/bookStore">Home</a>/Cart</div>

                    <div className = "Cart">
                        <div className = "heading">My Cart</div>
                        
                        {this.state.notes.slice(0).reverse().map((value: any) =>

                        <div key = {value.id} className= "cartitems">

                        <img id = "image2" src={book1} alt="Book" />

                        <div className= "Paper2">
                            <div>BookName</div>
                            <div className="price">Rs.{value.price}</div>

                        </div>

                        <div className = "PlaceOrder">
                        <Button className = "buttonsize" size = "small" color="primary" variant="contained">
                            Place Order
                        </Button>
                        </div>

                        </div>

                        )}
                    </div>


                </div>

                <Footer/>

            </div>
        )
    }
}
