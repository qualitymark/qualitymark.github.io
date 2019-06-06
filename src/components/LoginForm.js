import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import logo from '../images/logo.jpg'


class LoginForm extends Component {

    state = {
        signUp: false,
        signUpSuccess: false,
        signUpFailure: false,
        loginFailure: false,
        loginSuccess: false,
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',

    }

    handleSignUpButton = () => {
        this.setState({ signUp: !this.state.signUp })
    }

    signUpSuccess = () => this.setState({ signUpSuccess: true, signUpFailure: false, signUp: false, password: '', emailError: false, userNameError: false, passwordError: false })

    signUpFailure = (error) => { this.setState({ signUpSuccess: false, signUpFailure: true, signUp: true, error: error }) }

    loginFailure = (error) => this.setState({ loginFailure: true, signUp: false, error: error })

    loginSuccess = (login) => {
        this.setState({ loginSuccess: true, loginFailure: false, signUp: false, password: '', emailError: false,passwordError: false, user:login })
        this.props.handleLogin(this.state.user)
    }

    // Needs input validation
    handleLogin = async (e, { name, value }) => {
        e.preventDefault()
        let { email, password } = this.state
        if (!email) {
            this.setState({ emailError: true })
            this.loginFailure('Invalid Email')
            return
        }
        if (!password) {
            this.setState({ passwordError: true })
            this.loginFailure('Invalid password')
            return
        }
        const loginRes = await axios.post('https://quality-mark-server.herokuapp.com/login', {
            email: email,
            password: password
        })
        const login = loginRes.data
        // console.log(login)
        login.error ? this.loginFailure(login.error) : this.loginSuccess(login)

    }

    // Needs input validation
    handleSignUp = async (e, { name, value }) => {
        e.preventDefault()
        let { firstName, lastName, email, userName, password } = this.state
        if (!email) {
            this.setState({ emailError: true })
            this.signUpFailure('Invalid Email')
            return
        }
        if (!userName) {
            this.setState({ userNameError: true })
            this.signUpFailure('Username cannot be blank')
            return
        }
        if (!password) {
            this.setState({ passwordError: true })
            this.signUpFailure('Invalid password')
            return
        }

        const signUpRes = await axios.post('https://quality-mark-server.herokuapp.com/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password
        })
        const signUp = signUpRes.data
        console.log(signUp)
        signUp.error ? this.signUpFailure(signUp.error) : this.signUpSuccess()

    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        return (
            <Grid textAlign='center' style={{ padding: '20px 20px' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' style={{ color: '#1B1C1D' }} textAlign='center'>
                        <Image src={logo} /> {!this.state.signUp ? `Log in to your account` : `Sign up for an account`}
                    </Header>
                    <Form size='large'>
                        {!this.state.signUp ?
                            <Segment>
                                <Form.Input
                                    name='email'
                                    value={this.state.email}
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    error={this.state.emailError}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    name='password'
                                    value={this.state.password}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    error={this.state.passwordError}

                                    onChange={this.handleChange}
                                />
                                <Button onClick={this.handleLogin} color='blue' fluid size='large'>Login</Button>
                            </Segment>
                            :
                            <Segment>
                                <Form.Input
                                    name='firstName'
                                    value={this.state.firstName}
                                    fluid icon='user'
                                    iconPosition='left'
                                    placeholder='First Name (Optional)'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    name='lastName'
                                    value={this.state.lastName}
                                    fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Last Name (Optional)'
                                    onChange={this.handleChange}

                                />
                                <Form.Input
                                    name='email'
                                    value={this.state.email}
                                    fluid icon='mail'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    error={this.state.emailError}
                                    onChange={this.handleChange}

                                />
                                <Form.Input
                                    name='userName'
                                    value={this.state.userName}
                                    fluid icon='user circle'
                                    iconPosition='left'
                                    placeholder='Username'
                                    error={this.state.userNameError}
                                    onChange={this.handleChange}

                                />
                                <Form.Input
                                    name='password'
                                    value={this.state.password}
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    error={this.state.passwordError}
                                    onChange={this.handleChange}

                                />
                                <Button color='blue' fluid size='large' onClick={this.handleSignUp}>Sign up</Button>
                            </Segment>
                        }
                    </Form>

                    {this.state.signUpSuccess ? <Message success header='Success' content="Thank you for registering for QualityMark" /> :
                        this.state.signUpFailure ? <Message negative header='Error' content={this.state.error} /> :
                            this.state.loginFailure ? <Message negative header='Error' content={this.state.error} /> :
                                this.state.loginSuccess ? <Message success header='Success' content='Logging in...' /> :
                                    !this.state.signUp ? <Message>New to us? <a href='#' onClick={this.handleSignUpButton}>Sign Up</a></Message> :
                                        <Message>Back to <a href='#' onClick={this.handleSignUpButton}>Log in</a></Message>}

                </Grid.Column>
            </Grid>
        )

    }

}

export default LoginForm