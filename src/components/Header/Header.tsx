import React, { Component } from 'react'
import './Header.css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';

import { Redirect } from "react-router-dom";

import Userservice from '../../services/userservice';

import AppContext from '../../components/Context';

import book1 from '../assets/book1.png';


const axios_service = new Userservice();

interface IProps {
}

interface IState {
    books?: any,
    notes?: any,
    redirect?: any,
    openDropDown: boolean,
    openDropDown2: boolean,
    search ?: any,
    searchbook?: any
}

const NumberContext : any = React.createContext(0);

export default class Header extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            books: [],
            notes: [],
            redirect: null,
            openDropDown: false,
            openDropDown2: false,
            search: '',
            searchbook : ''
        }

    }

    componentDidMount() {
        this.GetData();
        this.GetCart();
    }

    GetData = () => {
        axios_service.Getdata().then((result) => {
            this.setState({books : result.data.books.map((obj : object)=> ( obj = { ...obj, active: false } ))});
            console.log(this.state.books);
        }).catch((ex) => {
            console.log(ex);
        })

    }

    GetCart = () => {
        axios_service.Getcart().then((result) => {

            console.log(result.data.book[0].email);
            
            this.setState({ notes: result.data.book });
            
            console.log(this.state.notes.book[0]);

            console.log(this.state.notes);
        }).catch(() => {

        })
    }

    toWishList = () => {
        this.setState({ redirect: "/wishlist" });
    }

    toCart = () => {
        console.log(window.location.href)
        if(window.location.href !== "http://localhost:3000/cart"){
        this.setState({ redirect: "/cart" });
        }
    }

    opendropdown = () => {
        this.setState({ openDropDown: true });
    }

    closedropdown = () => {
        this.setState({ openDropDown: false });
    }

    LogOut = () => {
        localStorage.removeItem("id");
        this.setState({ redirect: "/loginOrSignUp" });
    }

    search =(e: any) => {

        this.setState({ redirect: "/search" });
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


                        <div>

                        { this.state.openDropDown2 
                        
                        ?
                        <div>
                        <InputBase
                        className = "search2"
                        onChange = {e => this.search(e)}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        />

                        <div className="menulist3">

                            {this.state.searchbook}

                            {/* <Menu
                                id="simple-menu"
                                keepMounted
                                open={this.state.openDropDown2}
                                onClose={this.closedropdown2}
                                className="menulist2"
                            >
                                <MenuItem onClick={this.closedropdown2}>{this.state.searchbook}</MenuItem>
                            </Menu> */}

                        </div>
                        </div>

                        :

                        <InputBase
                        className = "search2"
                        onChange = {e => this.search(e)}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        />

                        }

                        </div>

                        

                    </div>

                    <div className="PersonOutlineOutlinedIcon">
                        {/* {this.state.openDropDown ? */}
                            <div className="dropdown">
                                <div className= "x">
                                    <PersonOutlineOutlinedIcon onClick={this.opendropdown} />
                                    <div className="Style"> Person </div>
                                </div>
                                <div className="y">
                                <Menu
                                    id="simple-menu"
                                    keepMounted
                                    open={this.state.openDropDown}
                                    onClose={this.closedropdown}
                                    className="menulist"
                                    >
                                    <div className = "insidemenu2"><strong>Hello {this.state.notes.book}</strong></div>
                                    <MenuItem onClick={this.toWishList}>My WishList</MenuItem>
                                    <Button className = "buttonsize2" onClick = {this.LogOut} size = "small" variant="contained">
                                                    Logout
                                    </Button>

                                </Menu>
                                </div>
                            </div>
                            {/* // :
                            // <div>
                            //     <PersonOutlineOutlinedIcon onClick={this.opendropdown} />
                            //     <div className="Style"> Person </div>
                            // </div>
                        //} */}
                    </div>
                    <div className="ShoppingCartIcon">
                    <AppContext.Consumer>
                        { (value : any) => (
                        <Badge badgeContent={value} >

                            <ShoppingCartIcon onClick={this.toCart} /> 
                    
                        </Badge>
                        )}
                    </AppContext.Consumer>
                        <div className="Style">Cart</div></div>

                </header>
            </div>
        )
    }
}
