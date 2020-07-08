import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/authReducer'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import logo from '../images/pogotrade.png'

const Nav = (props) => {
// class Nav extends Component {  
    logout = () => {
        axios.delete('/auth/logout').then( () => {
            this.props.logoutUser()
            this.props.history.push('/')
        })
    }

    render (props) {
        return (
            <div className='nav-container'>
                <img className='app-logo' src={logo} alt='PogoTrade logo' />
                <nav>
                    <Link to='/dashboard'>
                        My List
                    </Link>
                    <Link to='/profile'>
                        My Profile
                    </Link>
                    <Link to='/contact'>
                        Contact
                    </Link>
                    <Link to='/' onClick={ () => this.logout() }>
                        Logout
                    </Link>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {logoutUser})(withRouter(Nav))