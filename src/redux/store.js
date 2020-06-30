import authDux from './authReducer'
// import pokeDux from './pokeReducer'
import {createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

// const rootDux = re

export default createStore( authDux, applyMiddleware(promiseMiddleware))