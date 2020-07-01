import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../redux/authReducer'
import {Link} from 'react-router-dom'

// const Login = (props) => {
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = e => {
        e.preventDefault()
        const {value, password} = this.state
        axios.post('/auth/login', {value, password})
        .then( res => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch ( err => {
            alert(err.response.data)
        })
    }

    render() {
        const {value, password} = this.state
        return (
            <div>
                <form onSubmit={e => this.login(e)}>
                    <input 
                        type='text' 
                        placeholder='username or email' 
                        name='value' 
                        value={value} 
                        onChange={e => this.handleChange(e)}/>
                    <input 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        value={password} 
                        onChange={e => this.handleChange(e)}/>
                    <button type='submit'>Login</button>
                </form>
                <span>Don't have an account? </span>
                <Link to='/register'>Register now!</Link>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Login)