import React, { Component } from 'react'

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

import book1 from '../assets/book1.png';


const axios_service = new Userservice();

interface IProps {
}

interface IState {
    notes?: any,
    redirect?: any,
    openDropDown? : boolean
}

export default class Header extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            redirect: null,
            openDropDown: false
        }

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

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

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
            </div>
        )
    }
}