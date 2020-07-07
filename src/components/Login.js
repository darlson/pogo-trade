import React,{useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../redux/authReducer'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const Login = props => {
    const [value, setValue] = useState('')
    const [password, setPassword] = useState('')

    const login = e => {
        e.preventDefault()
        axios.post('/auth/login', {value, password})
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
            <form onSubmit={e => login(e)}>
                <input 
                    className='login-input'
                    type='text' 
                    placeholder='username or email' 
                    value={value} 
                    onChange={(e, v) => setValue(e.target.value)}/>
                <input 
                    className='login-input'
                    type='password' 
                    placeholder='password' 
                    value={password} 
                    onChange={(e, v) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
            <span>Don't have an account? </span>
            <Link to='/register'>Register now!</Link>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Login)