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
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Redirect } from "react-router-dom";

import Userservice from '../../services/userservice';

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

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

export default class Cart extends Component<IProps, IState> {

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

    change = (e: any) => {

        console.log(e.target.value);
        this.setState({ Email: e.target.value });
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

    orderItems = (id : any, quantity : any) => {
        axios_service.Order(id, quantity).then((result) => {
            console.log(result.data);
        }).catch(() => {

        })
    }

    toCart = () => {
        this.setState({ redirect: "/cart" });
    }

    openDetailsforCustomer = () => {
        this.setState({ openDetails: true });
    }

    openDetailsforSummary = () => {
        this.setState({ openDetailsSummary: true });
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (

            <div>
                <Header />

                <div className="Body2">

                    <div className="Title"><a href="http://localhost:3000/bookStore">Home</a>/Cart</div>

                    <div className="Cart">
                        <div className="heading">My Cart</div>

                        {this.state.notes.slice(0).reverse().map((value: any) =>

                            <div key={value.id} className="cartitems">

                                <img id="image2" src={book1} alt="Book" />

                                <div className="Paper2">

                                    <div>BookName</div>
                                    <div className="price">Rs.{value.price}</div>
                                    <label>Quantity :</label>
                                    <input type="number" id="quantity" name="quantity" min="1" max="99"></input>

                                </div>

                            </div>

                        )}

                        {this.state.openDetails ?

                            <div></div>

                            :

                            <div className="PlaceOrder">
                                <Button className="buttonsize" onClick={this.openDetailsforCustomer} size="small" color="primary" variant="contained">
                                    Place Order
                                </Button>
                            </div>
                        }
                    </div>

                    <div className="space1"></div>

                    {this.state.openDetails ?

                        <div className="openDetails">
                            <div className="heading">Customer Details</div>
                            <div className="takeinput">
                                <div className="giveinput">
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Name"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Phone Number"
                                            type="Number"
                                            name="Number"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                </div>
                                <div className="giveinput">
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Pin Code"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Locality"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                </div>
                                <div className="b">
                                    <TextField
                                        error={this.state.NumberError}
                                        label="Address"
                                        type="text"
                                        name="text"
                                        variant="outlined"
                                        onChange={e => this.change(e)}
                                        helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                    />
                                </div>
                                <div className="giveinput">
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="City/Town"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Landmark"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                                        />
                                    </div>
                                </div>

                                <div className="left">Type</div>

                                <div className="left">

                                    <FormControlLabel
                                        control={
                                            <Checkbox

                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Home"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox

                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Work"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox

                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Other"
                                    />

                                    {this.state.openDetailsSummary ?

                                        <div></div>

                                        :

                                        <div className="PlaceOrder">
                                            <Button className="buttonsize" onClick={this.openDetailsforSummary} size="small" color="primary" variant="contained">
                                                Continue
                                            </Button>
                                        </div>
                                    }

                                </div>

                            </div>
                        </div>

                        :
                        <div className="Details">
                            Customer Details
                        </div>
                    }

                    <div className="space1"></div>

                    {this.state.openDetailsSummary ?


                        <div className="Cart">
                            <div className="heading">My Cart</div>

                            {this.state.notes.slice(0).reverse().map((value: any) =>

                                <div key={value.id} className="cartitems">

                                    <img id="image2" src={book1} alt="Book" />

                                    <div className="Paper2">

                                        <div>BookName</div>
                                        <div className="price">Rs.{value.price}</div>
                                    </div>

                                    <div className="Place">
                                        <Button className="buttonsize" onClick={() => this.orderItems(value.bookId, value.quantity)} size="small" color="primary" variant="contained">
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </div>
                        :

                        <div className="Details">
                            Order Summary
                        </div>

                    }
                </div>
                <div className="space1"></div>
                <Footer />

            </div>
        )
    }
}
