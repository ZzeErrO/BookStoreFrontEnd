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
import Pagination from '@material-ui/lab/Pagination';

import { Redirect } from "react-router-dom";

import Userservice from '../../services/userservice';

import AppContext from '../../components/Context';

import book1 from '../../assets/book1.png';
import book2 from '../assets/book2.png';
import book3 from '../assets/book3.png';
import book4 from '../assets/book4.png';
import book5 from '../assets/book5.png';
import book6 from '../assets/book6.png';
import book7 from '../assets/book7.png';

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { AnyPtrRecord } from 'dns';
import { isConstructorDeclaration } from 'typescript';

const axios_service = new Userservice();

interface IProps {
}

interface IState {
    notes?: any,
    cartnotes?: any,
    redirect?: any,
    openDropDown? : boolean,
    openbutton? : boolean,
    currentPage?: any
}

export default class BookStore extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            notes: [],
            cartnotes: [],
            redirect: null,
            openDropDown: false,
            openbutton: false,
            currentPage: 0
        }

    }

    componentDidMount() {
        this.GetData();
        this.GetCart();
    }

    CheckTF = (id : any) : boolean =>
    {
        let check: boolean = false;
        this.state.cartnotes.forEach((value : any) => {
            if (value.bookId === id) {
                check = true;
            }
        })

        return check;

    }

    GetData = () => {
        axios_service.Getdata().then((result) => {
            this.setState({notes : result.data.books.map((obj : object)=> ( obj = { ...obj, active: false, isdescription : false, description : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus estundefined" } ))});
            console.log(this.state.notes);
        }).catch((ex) => {
            console.log(ex);
        })

    }

    GetCart = () => {
        axios_service.Getcart().then((result) => {
            this.setState({ cartnotes: result.data.book });
            console.log(this.state.cartnotes);
        }).catch(() => {

        })
    }

    addtoCart = (value : any, index : any) => {

        let findIndex = this.state.notes.findIndex((element : any) => element.id == value);

        //console.log(findIndex);

         let newArray = [...this.state.notes]

         newArray[findIndex] = {...newArray[findIndex], active : true}

         console.log(newArray[findIndex]);

         this.setState({notes: newArray});

         axios_service.AddtoCart(value).then((result) => {
         console.log(result.data);
         this.GetCart();
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

    pageFunction = (event: object, page: number) => {
        console.log(" Page: " + page + " nextIndex: " + (page -1) * 12);
        this.setState({currentPage: (page -1) * 12 });
    }

    descriptionshow = (id: any, index : any) => {
        let findIndex = this.state.notes.findIndex((element : any) => element.id == id);

         let newArray = [...this.state.notes]

         newArray[findIndex].isdescription = true;

         this.setState({notes: newArray});
    }

    descriptionclose = (id: any, index : any) => {
        let findIndex = this.state.notes.findIndex((element : any) => element.id == id);

         let newArray = [...this.state.notes]

         newArray[findIndex].isdescription = false;

         this.setState({notes: newArray});
    }

    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }

        return (

            <div>
                <AppContext.Provider value={this.state.cartnotes.length}>
                    <Header/>
                </AppContext.Provider>
                <div className="Body">
                    <div className="Title">Books({this.state.notes.length})</div>

                    <Grid item xs={12}>
                        <Grid container justify="flex-start">
                            {this.state.notes.slice(this.state.currentPage , this.state.currentPage + 12).reverse().map((value: any, index : any) =>

                                <Grid key={value.id} item >

                                    <Paper className="paper">

                                        <div>
                                            {value.availableBooks !==0

                                            ?
                                            
                                            <div className="img">
                                                {value.isdescription
                                                    ?
                                                    <div className = "MainDescription">
                                                    <img id = "image2" src={book1} alt="Book" onMouseLeave={() => this.descriptionclose(value.id, index)}/>
                                                    <div className = "Description">
                                                        <div><h3>Book Details</h3></div>
                                                        <div>{value.description}</div>
                                                    </div>
                                                    </div>
                                                    :
                                                    <img id = "image2" src={book1} alt="Book" onMouseEnter = {() => this.descriptionshow(value.id, index)}/>
                                                }
                                            </div>

                                            :

                                            <div className="img2">
                                                <img id = "image3" src={book1} alt="Book" />
                                                <div className = "outofstock">OUT OF STOCK</div>
                                            </div>

                                            }

                                            <div className="Intro">

                                                <div className="bookName">{value.bookName} </div>
                                                <div className="by">by {value.authors}</div>
                                                <div className="rating">
                                                    <div className = "rate">4.5</div>
                                                    <div className="number">
                                                        ({value.availableBooks})
                                                    </div>
                                                </div>
                                                <div className="price">Rs.{value.price}</div>

                                                {value.availableBooks !==0 
                                                
                                                ?

                                                <div>
                                                { this.CheckTF(value.id)
                                                
                                                ? 

                                                <div className= "bookbuttons2">

                                                <Button className = "buttonsize1" size = "small" variant="contained" color="primary">
                                                Added to Bag
                                                </Button>

                                                </div>

                                                :

                                                <div className= "bookbuttons">
                                                <div >
                                                <Button className = "buttonsize" onClick = {() => this.addtoCart(value.id, index)} size = "small" variant="contained" color="secondary">
                                                Add to Bag
                                                </Button>
                                                </div>
                                                <div>
                                                <Button className = "buttonsize" onClick = {() => this.addtoWishList(value.id)} size = "small" variant="contained">
                                                WishList
                                                </Button>
                                                </div>
                                                </div>

                                                }
                                                </div>

                                                :

                                                <div>
                                                <Button className = "buttonsize1" onClick = {() => this.addtoWishList(value.id)} size = "small" variant="contained">
                                                    WishList
                                                </Button>
                                                </div>

                                            }

                                            </div>

                                        </div>

                                    </Paper>

                                </Grid>

                                
                            )}
                        </Grid>
                    </Grid>


                </div>

                <Pagination className = "pageination" onChange = {this.pageFunction} count={Math.ceil(this.state.notes.length / 12)} variant="outlined" shape="rounded" />

                <Footer/>
            </div>
        )
    }
}
