import axios from 'axios'

const initialState = {
    user: {
        username: '',
        profilePic: '',
        userId: 0
    }
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'

