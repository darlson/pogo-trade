import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../redux/authReducer'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const Register = (props) => {
        const [username, setUsername ] = useState('')
        const [email, setEmail ] = useState('')
        const [password, setPassword ] = useState('')
        const [first_name, setFN ] = useState('')
        const [last_name, setLN ] = useState('')
        const [alt_name, setAN ] = useState('')
        const [location, setLocation ] = useState('')

    const register = e => {
        e.preventDefault()
        axios.post('/auth/register', {username, email, password, first_name, last_name, alt_name, location})
        .then( res => {
            props.loginUser(res.data)
            props.history.push('/dashboard')
        })
        .catch( err => {
            toast.error(err.response.data)
        })
    }
    
    return (
        <div>
            <form onSubmit={e => register(e)}>
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='Username' 
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='Email' 
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    className='login-input'
                    type='password' 
                    placeholder='Password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='First Name' 
                    value={first_name}
                    onChange={e => setFN(e.target.value)} />
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='Last Name' 
                    value={last_name}
                    onChange={e => setLN(e.target.value)} />
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='Username on Slack/Discord' 
                    value={alt_name}
                    onChange={e => setAN(e.target.value)} />
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='Location' 
                    value={location}
                    onChange={e => setLocation(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
            <span>Already have an account? </span>
            <Link to='/'>Login now!</Link>
        </div>
    )
}

const mapStateToProps = state => state

export default  connect(mapStateToProps, {loginUser})(Register)