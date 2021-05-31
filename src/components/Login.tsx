import React, { Component } from 'react'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from "react-router-dom";

import Userservice from '../services/userservice';

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

export default class Login extends Component<IProps,IState> {
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

    toSignUp = (e : any) => {
        this.setState({ openSignInOrUp: false });
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

    render() {
        return (
            <div className = "Login">
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
        )
    }
}
