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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';

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
    open?: boolean,

    FullName?: string,
    Number?: string,
    PinCode?: any,
    Locality?: string,
    Address?: string,
    City?: string,
    LandMark?: string,

    FullNameError?: boolean,
    NumberError?: boolean,
    PinCodeError?: boolean,
    LocalityError?: boolean,
    AddressError?: boolean,
    CityError?: boolean,
    LandMarkError?: boolean,

    Email?: string,
    Password?: string,
    EmailError?: boolean,
    PasswordError?: boolean,
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
            open: false,
            FullName: '',
            Email: '',
            Password: '',
            Number: '',
            PinCode: '',
            Locality: '',
            Address: '',
            City: '',
            LandMark: '',
            FullNameError: false,
            EmailError: false,
            PasswordError: false,
            NumberError: false,
            PinCodeError: false,
            LocalityError: false,
            AddressError: false,
            CityError: false,
            LandMarkError: false,
        }

    }

    change00 = (e: any, value: any, index: any) => {

        console.log(e);

        if(e > 1){
        e -= 1
        }else
        {e = 1}
        
        console.log(e);

        console.log(index);

        let newArray = [...this.state.notes]

        newArray[index] = { ...newArray[index], quantity: e }

        console.log(newArray[index]);

        this.setState({ notes: newArray });

    }

    change0 = (e: any, value: any, index: number) => {

        console.log(e);
        e += 1
        console.log(e);

        console.log(index);

        let newArray = [...this.state.notes]

        console.log(newArray[index]);

        newArray[index] = { ...newArray[index], quantity: e }

        console.log(newArray[index]);

        this.setState({ notes: newArray });

    }

    change = (e: any) => {

        console.log(e.target.value);
        this.setState({ FullName: e.target.value });
    }

    change1 = (e: any) => {

        console.log(e.target.value);
        this.setState({ Number: e.target.value });
    }

    change2 = (e: any) => {

        console.log(e.target.value);
        this.setState({ PinCode: e.target.value });
    }

    change3 = (e: any) => {

        console.log(e.target.value);
        this.setState({ Locality: e.target.value });
    }

    change4 = (e: any) => {

        console.log(e.target.value);
        this.setState({ Address: e.target.value });
    }

    change5 = (e: any) => {

        console.log(e.target.value);
        this.setState({ City: e.target.value });
    }

    change6 = (e: any) => {

        console.log(e.target.value);
        this.setState({ LandMark: e.target.value });
    }

    componentDidMount() {
        this.GetCart();
    }

    GetCart = () => {
        axios_service.Getcart().then((result) => {
            this.setState({ notes: result.data.book });
            if (this.state.notes.length === 0) {
                this.setState({ open: true })
            }
        }).catch(() => {

        })
    }

    orderItems = () => {
        this.state.notes.forEach((element : any )=> {
            axios_service.Order(element.bookId, element.quantity).then((result) => {
                console.log(result.data);
            }).catch(() => {
    
            })
        });

        this.setState({ redirect: "/success" });

    }

    toCart = () => {
        this.setState({ redirect: "/cart" });
    }

    openDetailsforCustomer = () => {
        this.setState({ openDetails: true });
    }

    validation = () => {
        let isError: boolean = false;
        const errors: any = this.state;

        errors.FullNameError = this.state.FullName === '' ? true : false;
        errors.NumberError = this.state.Number === '' ? true : false;
        errors.PinCodeError = this.state.PinCode === '' ? true : false;
        errors.LocalityError = this.state.Locality === '' ? true : false;
        errors.AddressError = this.state.Address === '' ? true : false;
        errors.CityError = this.state.City === '' ? true : false;
        errors.LandMarkError = this.state.LandMark === '' ? true : false;

        this.setState({

            ...errors
        })
        return isError = (errors.FullName !== '' && errors.Number !== ''
            && errors.PinCode !== '' && errors.Locality !== ''
            && errors.Address !== '' && errors.City !== ''
            && errors.LandMark !== '') ? true : false
    }

    openDetailsforSummary = () => {
        var isValidated = this.validation();
        console.log(isValidated);
        if (isValidated) {
            this.setState({ openDetailsSummary: true });
        };
    }

    delete = (value : any) => {
        axios_service.DeleteCart(value).then((result) => {
            console.log(result.data);
            this.GetCart();
            
        }).catch(() => {

        })
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (

            <div>
                <Header />

                <div className="Body2">

                    <div className="Title"><a href="http://localhost:3000/bookStore">Home</a>/Cart({this.state.notes.length})</div>

                    <div className="Cart">
                        <div className="heading">My Cart</div>

                        {this.state.notes.map((value: any, index: any) =>

                            <div key={value.id} className="cartitems">

                                <img id="image2" src={book1} alt="Book" />

                                <div className="Paper2">

                                    <div>{value.bookName}</div>
                                    <div className="price">Rs.{value.price}</div>

                                    <div className = "Quantity10">
                                    <IndeterminateCheckBoxRoundedIcon onClick={e => this.change00(value.quantity, value.id, index)}/>
                                    <input type="text" value = {value.quantity} name="quantity"/>
                                    <AddBoxRoundedIcon onClick={e => this.change0(value.quantity, value.id, index)}/>
                                    </div>

                                    <DeleteOutlineOutlinedIcon className = "DeleteIcon" onClick = {() => this.delete(value.bookId)}/>

                                </div>

                            </div>

                        )}

                        { this.state.openDetails ?

                            <div></div>

                            :
                            <div>
                            { this.state.open ? 

                                <div></div>

                                :
                                
                                <div className="PlaceOrder">
                                    <Button className="buttonsize" onClick={this.openDetailsforCustomer} size="small" color="primary" variant="contained">
                                        Place Order
                                    </Button>
                                </div>
                            }
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
                                            error={this.state.FullNameError}
                                            size="small"
                                            label="Name"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change(e)}
                                            helperText={this.state.FullNameError ? "Name" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.NumberError}
                                            size="small"
                                            label="Number"
                                            type="Number"
                                            name="Number"
                                            variant="outlined"
                                            onChange={e => this.change1(e)}
                                            helperText={this.state.NumberError ? "Phone Number" : ''}
                                        />
                                    </div>
                                </div>
                                <div className="giveinput">
                                    <div className="a">
                                        <TextField
                                            error={this.state.PinCodeError}
                                            size="small"
                                            label="Pin Code"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change2(e)}
                                            helperText={this.state.PinCodeError ? "Pin Code" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.LocalityError}
                                            size="small"
                                            label="Locality"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change3(e)}
                                            helperText={this.state.LocalityError ? "Locality" : ''}
                                        />
                                    </div>
                                </div>
                                <div className="b">
                                    <TextField
                                        error={this.state.AddressError}
                                        label="Address"
                                        type="text"
                                        name="text"
                                        variant="outlined"
                                        onChange={e => this.change4(e)}
                                        helperText={this.state.AddressError ? "Address" : ''}
                                    />
                                </div>
                                <div className="giveinput">
                                    <div className="a">
                                        <TextField
                                            error={this.state.CityError}
                                            size="small"
                                            label="City/Town"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change5(e)}
                                            helperText={this.state.CityError ? "City" : ''}
                                        />
                                    </div>
                                    <div className="a">
                                        <TextField
                                            error={this.state.LandMarkError}
                                            size="small"
                                            label="Landmark"
                                            type="text"
                                            name="text"
                                            variant="outlined"
                                            onChange={e => this.change6(e)}
                                            helperText={this.state.LandMarkError ? "LandMark" : ''}
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
                                            <Button className="buttonsize3" onClick={this.openDetailsforSummary} size="small" color="primary" variant="contained">
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
                            <div className="heading">Order Summary</div>

                            {this.state.notes.slice(0).reverse().map((value: any) =>
                                <div>
                                    <div key={value.id} className="cartitems">

                                        <img id="image2" src={book1} alt="Book" />

                                        <div className="Paper2">

                                            <div>{value.bookName}</div>
                                            <div className="price">Rs.{value.price}</div>
                                        </div>

                                    </div>

                                </div>
                            )}

                            <div className="Place">
                                        <Button className="buttonsize" onClick={this.orderItems} size="small" color="primary" variant="contained">
                                            Checkout
                                        </Button>
                            </div>

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
