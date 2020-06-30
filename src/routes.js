import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Contact from './components/Contact'
// import  from './components/'

export default (
    <Switch>
        <Route component={Login}        exact path='/' />
        <Route component={Register}     path='/register' />
        <Route component={Dashboard}    path='/dashboard' />
        <Route component={Profile}     path='/profile' />
        <Route component={Contact}     path='/contact' />
    </Switch>
)