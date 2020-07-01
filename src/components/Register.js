import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../redux/authReducer'
import {Link} from 'react-router-dom'

// const Register = (props) => {
class Register extends React.Component {
    constructor () {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            alt_name: '',
            location: '',
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    register = e => {
        e.preventDefault()
        const {username, email, password, first_name, last_name, alt_name, location } = this.state
        axios.post('/auth/register', {username, email, password, first_name, last_name, alt_name, location})
        .then( res => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch( err => {
            alert(err.response.data)
        })
    }
    
    render() {
        const {username, email, password, first_name, last_name, alt_name, location } = this.state
        return (
            <div>
                <form onSubmit={e => this.register(e)}>
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        value={username}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='Email' 
                        name='email' 
                        value={email}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        value={password}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='First Name' 
                        name='first_name' 
                        value={first_name}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='Last Name' 
                        name='last_name' 
                        value={last_name}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='Username on Slack/Discord' 
                        name='alt_name' 
                        value={alt_name}
                        onChange={e => this.handleChange(e)} />
                <input 
                        className='login-input'
                        type='text' 
                        placeholder='Location' 
                        name='location' 
                        value={location}
                        onChange={e => this.handleChange(e)} />
                <button type='submit'>Register</button>
                </form>
                <span>Already have an account? </span>
                <Link to='/'>Login now!</Link>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default  connect(mapStateToProps, {loginUser})(Register)