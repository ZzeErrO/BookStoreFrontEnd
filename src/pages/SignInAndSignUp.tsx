import React, { Component } from 'react'
import logo from '../assets/component.png';
import './SignInAndSignUp.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    redirect?: null,
    open?: boolean
}


export default class SignInAndSignUp extends Component<IProps, IState> {

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

    render() {

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
                            <Button variant="contained" color="secondary" onClick={this.toSignUp}>  Login </Button>
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
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.FullNameError}
                        label="Enter Full Name"
                        type="text"
                        name="Text"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.FullNameError ? "Enter Full Name" : ''}
                        />
                        </div>

                        <div className="Email">
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

                        <div className="Password">
                        <TextField
                        error={this.state.PasswordError}
                        label="Enter Password"
                        type="Password"
                        name="Password"
                        variant="outlined"
                        onChange={e => this.handleChange(e)}
                        helperText={this.state.PasswordError ? "Enter Password" : ''}
                        />
                        </div>

                        <div className="Phone">
                        <TextField
                        //inputRef={this.inputref}
                        error={this.state.NumberError}
                        label="Enter Phone Number"
                        type="Number"
                        name="Nuumber"
                        variant="outlined"
                        onChange={e => this.change(e)}
                        helperText={this.state.NumberError ? "Enter Phone Number" : ''}
                        />
                        </div>

                        <div className= "LoginButton">
                            <Button variant="contained" color="secondary" onClick={this.toSignIn}>  SignUp </Button>
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
