import React, { Component } from 'react'
import logo from '../assets/component.png';
import './SignInAndSignUp.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from "react-router-dom";

import Userservice from '../services/userservice';
import { isNullishCoalesce } from 'typescript';

const axios_service = new Userservice();

interface IProps {
}

interface IState {
    openSignInOrUp?: boolean,
    FullName?: string,
    Email?: string,
    Password?: string,
    Number?: string,
    FullNameError?: boolean,
    EmailError?: boolean,
    PasswordError?: boolean,
    NumberError?: boolean,
    redirect?: any,
    open?: boolean
}


export default class SignInAndSignUp extends Component<IProps,IState> {

    constructor(props : any){
        super(props);
        this.state = {
            openSignInOrUp: true,
            FullName:'',
            Email: '',
            Password: '',
            Number: '',
            FullNameError: false,
            EmailError: false,
            PasswordError: false,
            NumberError: false,
            redirect: null,
            open: false
        }
        //this.inputref = React.createRef()
    }

    componentDidMount(){
        document.title = `SignInAndSignUp`;
        //console.log(this.inputref)
        //this.inputref.current.focus()
    }

    toSignUp = (e : any) => {
        this.setState({ openSignInOrUp: false });
    }

    toSignIn = (e : any) => {
        this.setState({ openSignInOrUp: true });
    }

    change = (e : any) => {

        console.log(e.target.value);
        this.setState({ Email: e.target.value });
    }
    
    handleChange = (e : any) => {
    
        console.log(e.target.value);
        this.setState({ Password: e.target.value });
    }

    validation = () => {
        let isError : boolean = false;
        const errors : any = this.state;
        errors.EmailError = this.state.Email === '' ? true : false;
        errors.PasswordError = this.state.Password === '' ? true : false;
        this.setState({
    
          ...errors
        })
        return isError = (errors.Email !== '' && errors.Password !== '') ? true : false
    }

    validation2 = () =>{
        let isError : boolean =false;
        const errors : any = this.state;
        errors.FullNameError= this.state.FullName === '' ? true : false;
        errors.EmailError= this.state.Email === '' ? true : false;
        errors.PasswordError= this.state.Password === '' ? true : false;
        errors.NumberError= this.state.Number === '' ? true : false;
        this.setState({

          ...errors
        })
        return isError = (errors.Email !=='' && errors.Password !== '' && errors.FullName !== '' && errors.Number) ? true : false
      }

    Next = () => {

        var isValidated = this.validation();
        console.log(this.state.Email);
        console.log(this.state.Password);
    
        if (isValidated) {
          this.setState({ open: true });
          let data = {
            "email": this.state.Email,
            "password": this.state.Password
          };
    
          console.log("validation successful");
          axios_service.Login(data).then((result) => {
            console.log(result);
            this.setState({ open: true });
            localStorage.setItem('id',result.data.token);
            setTimeout(() => this.setState({ redirect: "/bookStore" }), 4000)
    
          }).catch(() => {
    
          })
    
        }
    
        if (!isValidated) {
          alert("validation unsuccessful");
        }
    
    }

    Next2 = () =>{

        var isValidated = this.validation2();
        console.log(this.state.Email);
        console.log(this.state.Password);
        if(!isValidated){
          console.log("Account Creation unsuccessful");
        }
        if(isValidated)
        {
          let data = {
            "fullName": this.state.FullName,
            "number": this.state.Number,
            "email": this.state.Email,
            "password": this.state.Password
          };

          axios_service.Registration(data).then((result) => {
              console.log(result);
              if(result.data.success)
              {  console.log("***********************success*******************")
                //this.props.userdata_update(result.data.data)
                /*localStorage.setItem('user_details', result.data.data);
                this.setState({ open: true });*/
                setTimeout(() => this.setState({ openSignInOrUp: true }), 4000)
              }
          })
        }
      }


    render() {

        if (this.state.redirect) {

            return <Redirect to={this.state.redirect} />
        }
      

        return (
            <div className = "body">
                
                <div className = "centerbody">
                    <div className ="imageandform">
                    <div>
                    <img id= "image" src = {logo} alt = "BookStore"/>
                    <div className = "belowImage"><strong>ONLINE BOOK SHOPPING</strong></div>
                    </div>

                    <div className = "form">
                    
                        {this.state.openSignInOrUp

                        ?

                        <div className = "Login">
                        <div className = "Change">
                        <Button variant="contained">  Login </Button>
                        <Button variant="contained" onClick={this.toSignUp}>  Sign Up </Button>
                        </div>
                        <div className="Email">
                        <div className="General">Email id</div>
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.EmailError}
                        label="Enter Email"
                        type="Email"
                        name="Email"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.EmailError ? "Enter Email Address" : ''}
                        />
                        </div>
                        <div className="ForgetPassword">
                        <div className="General">Password</div>
                        <TextField
                        error={this.state.PasswordError}
                        label="Enter Password"
                        type="Password"
                        name="Password"
                        variant="outlined"
                        onChange={e => this.handleChange(e)}
                        helperText={this.state.PasswordError ? "Enter Password" : ''}
                        />
                        
                        <a href="www.react.com">Forgot Password? </a>
                        
                        </div>
                        <div className= "LoginButton">
                            <Button variant="contained" color="secondary" onClick={this.Next}>  Login </Button>
                        </div>
                        <strong>-----OR-----</strong>

                        <div className="OtherLogin">

                        <Button variant="contained" color="primary">  Facebook </Button>
                        <Button variant="contained" >  Google </Button>
                        
                        </div>

                        </div>

                        :

                        <div className = "SignUp">
                        
                        <div className = "Change">
                        <Button variant="contained" onClick={this.toSignIn}>  Login </Button>
                        <Button variant="contained">  Sign Up </Button>
                        </div>

                        <div className="FullName">
                        <div className="General">Full Name</div>
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.FullNameError}
                        size="small"
                        label="Enter Full Name"
                        type="text"
                        name="Text"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.FullNameError ? "Enter Full Name" : ''}
                        />
                        </div>

                        <div className="Email">
                        <div className="General">Email</div>
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.EmailError}
                        size="small"
                        label="Enter Email"
                        type="Email"
                        name="Email"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.EmailError ? "Enter Email Address" : ''}
                        />
                        </div>

                        <div className="Password">
                        <div className="General">Password</div>
                        <TextField
                        error={this.state.PasswordError}
                        size="small"
                        label="Enter Password"
                        type="Password"
                        name="Password"
                        variant="outlined"
                        onChange={e => this.handleChange(e)}
                        helperText={this.state.PasswordError ? "Enter Password" : ''}
                        />
                        </div>

                        <div className="Phone">
                        <div className="General">Mobile Nuumber</div>
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.NumberError}
                        size="small"
                        label="Enter Phone Number"
                        type="Number"
                        name="Nuumber"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                        />
                        </div>

                        <div className= "LoginButton">
                            <Button variant="contained" color="secondary" onClick={this.Next2}>  SignUp </Button>
                        </div>

                        </div>

                        }
                    </div>
                    
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
