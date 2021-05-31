import React, { Component } from 'react'

import './BookStore.css'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';

import { Redirect } from "react-router-dom";

import Userservice from '../../services/userservice';

import book1 from '../../assets/book1.png';
import book2 from '../assets/book2.png';
import book3 from '../assets/book3.png';
import book4 from '../assets/book4.png';
import book5 from '../assets/book5.png';
import book6 from '../assets/book6.png';
import book7 from '../assets/book7.png';

import Header from '../../components/HeaderFooter/Header';
import Footer from '../../components/HeaderFooter/Footer';

const axios_service = new Userservice();

interface IProps {
}

interface IState {
    notes?: any,
    redirect?: any,
    openDropDown? : boolean
}

export default class BookStore extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false
        }

    }

    componentDidMount() {
        this.GetData();
    }

    GetData = () => {
        axios_service.Getdata().then((result) => {
            console.log(result.data.books);
            this.setState({ notes: result.data.books });
            console.log(this.state.notes);
            console.log(this.state.notes.bookName[0]);
        }).catch(() => {

        })
    }

    addtoCart = (value : any) => {
        console.log();
        axios_service.AddtoCart(value).then((result) => {
            console.log(result.data);
            
        }).catch(() => {

        })
    }
    
    addtoWishList = (value : any) => {
        axios_service.AddtoWishList(value).then((result) => {
            console.log(result.data);
        }).catch(() => {

        })
    }

    toWishList = () => {
        this.setState({ redirect: "/wishlist" });
    }

    toCart = () => {
        this.setState({ redirect: "/cart" });
    }

    opendropdown = () => {
        this.setState({ openDropDown : true });
    }

    closedropdown = () => {
        this.setState({ openDropDown : false });
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (

            <div>
                <Header/>
                <div className="Body">
                    <div className="Title">Books</div>


                    <Grid item xs={12}>
                        <Grid container justify="flex-start">
                            {this.state.notes.slice(0).reverse().map((value: any) =>

                                <Grid key={value.id} item >

                                    <Paper className="paper">

                                        <div>
                                            <div className="img">
                                                <img id = "image2" src={book1} alt="Book" />
                                            </div>

                                            <div className="Intro">

                                                <div className="bookName">{value.bookName} </div>
                                                <div className="by">by {value.authors}</div>
                                                <div className="rating">4.5 <div className="number">({value.availableBooks})</div></div>
                                                <div className="price">Rs.{value.price}</div>
                                                <div className= "bookbuttons">

                                                <div >
                                                <Button className = "buttonsize" onClick = {() => this.addtoCart(value.id)} size = "small" variant="contained" color="secondary">
                                                Add to Bag
                                                </Button>
                                                </div>
                                                <div >
                                                <Button className = "buttonsize" onClick = {() => this.addtoWishList(value.id)} size = "small" variant="contained">
                                                WishList
                                                </Button>
                                                </div>

                                                </div>
                                            </div>

                                        </div>

                                    </Paper>

                                </Grid>

                            )}
                        </Grid>
                    </Grid>


                </div>

                <Footer/>
            </div>
        )
    }
}
