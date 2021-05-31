import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


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
    openDropDown?: boolean,
    openDetails?: boolean,
    openDetailsSummary?: boolean,
    FullName?: string,
    Email?: string,
    Password?: string,
    Number?: string,
    FullNameError?: boolean,
    EmailError?: boolean,
    PasswordError?: boolean,
    NumberError?: boolean
}

export default class WishList extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false,
            openDetails: false,
            openDetailsSummary: false,
            FullName: '',
            Email: '',
            Password: '',
            Number: '',
            FullNameError: false,
            EmailError: false,
            PasswordError: false,
            NumberError: false
        }

    }

    componentDidMount() {
        this.GetWishList();
    }

    GetWishList = () => {
        axios_service.Getwishlist().then((result) => {
            console.log(result.data.wishList);
            this.setState({ notes: result.data.wishList });
            console.log(this.state.notes);
            console.log(this.state.notes.bookName[0]);
        }).catch(() => {

        })
    }

    movetoCart = (value : any) => {
        console.log();
        axios_service.AddtoCart(value).then((result) => {
            console.log(result.data);
            
        }).catch(() => {

        })
    }


    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <Header/>
                <div className="Body">
                    <div className="Title"><a href ="http://localhost:3000/bookStore">Home</a>/WishList</div>


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
                                                <p></p>
                                                <div><button onClick = {() => this.movetoCart(value.bookId)}>Move to Cart</button> <DeleteOutlineOutlinedIcon className = "DeleteIcon"/> </div>

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
