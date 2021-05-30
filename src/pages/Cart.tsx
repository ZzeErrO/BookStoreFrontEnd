import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { Redirect } from "react-router-dom";

import Userservice from '../services/userservice';

import book1 from '../assets/book1.png';

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

    toWishList = () => {
        this.setState({ redirect: "/bookStore/wishlist" });
    }

    toCart = () => {
        this.setState({ redirect: "/bookStore/cart" });
    }

    opendropdown = () => {
        this.setState({ openDropDown : true });
    }

    closedropdown = () => {
        this.setState({ openDropDown : false });
    }

    render() {
        return (
            <div>
                <header>

                    <MenuBookSharpIcon className="MenuBookSharpIcon" />
                    <div className="Name">Bookstore</div>

                    <div className="inputbase">

                        <div className="searchIcon"><SearchIcon /></div>
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className="PersonOutlineOutlinedIcon">
                        {this.state.openDropDown ?
                            <div className="dropdown">
                                <PersonOutlineOutlinedIcon onClick={this.closedropdown} />
                                <form>
                                    <select>
                                        <option>Hello Prashik</option>
                                        <option onClick={this.toWishList}>WishList</option>
                                    </select>
                                </form>
                            </div>
                            :
                            <div>
                                <PersonOutlineOutlinedIcon onClick={this.opendropdown} />
                                <div className="Style"> Person </div>
                            </div>
                        }
                    </div>
                    <div className="ShoppingCartIcon"><ShoppingCartIcon onClick={this.toCart} /> <div className="Style">Cart</div></div>

                </header>

                <div className="Body">
                    <div className="Title"><a href ="http://localhost:3000/bookStore">Home</a>/Cart</div>


                    <Grid item xs={12}>
                        <Grid container justify="flex-start">
                            {this.state.notes.slice(0).reverse().map((value: any) =>

                                <Grid key={value.id} item >

                                    <Paper className="paper">

                                        <div>
                                            <div className="img">
                                                <img src={book1} alt="Book" />
                                            </div>

                                            <div className="Intro">

                                                <div className="price">Rs.{value.price}</div>
                                                <div className="row"> <div className= "quantity">Quantity: </div><input></input></div>
                                                <div><button>Order</button> <DeleteOutlineOutlinedIcon className = "DeleteIcon"/> </div>

                                            </div>

                                        </div>

                                    </Paper>

                                </Grid>

                            )}
                        </Grid>
                    </Grid>


                </div>

                <footer>
                    <div className="text">
                        Copyright 2020, BookStore Private Limited.All Rights Reserved
                    </div>
                </footer>

            </div>
        )
    }
}
