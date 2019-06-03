import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../images/logo.jpg'


class LoginForm extends Component {

    state = {
        signUp: false,
        signUpSuccess: false,
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',

    }

    handleSignUpButton = () => {
        this.setState({ signUp: !this.state.signUp })
    }

    signUpSuccess = () => this.setState({signUpSuccess: true, signUp: false})

    // Needs input validation
    handleLogin = (e, { name, value }) => {
        e.preventDefault()
        let {email, password } = this.state
    }

    // Needs input validation
    handleSignUp = async (e, { name, value }) => {
        e.preventDefault()
        let { firstName, lastName, email, userName, password } = this.state
    
        this.signUpSuccess()

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
                                    onChange={this.handleChange}

                                />
                                <Form.Input
                                    name='userName'
                                    value={this.state.userName}
                                    fluid icon='user circle'
                                    iconPosition='left'
                                    placeholder='Username'
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
                                    onChange={this.handleChange}

                                />
                                <Button color='blue' fluid size='large' onClick={this.handleSignUp}>Sign up</Button>
                            </Segment>
                        }
                    </Form>

                    {this.state.signUpSuccess ? <Message success header='Success' content="Thank you for registering for QualityMark" /> :
                        !this.state.signUp ? <Message>New to us? <a href='#' onClick={this.handleSignUpButton}>Sign Up</a></Message> :
                            <Message>Back to <a href='#' onClick={this.handleSignUpButton}>Log in</a></Message>}

                </Grid.Column>
            </Grid>
        )

    }

}

export default LoginForm