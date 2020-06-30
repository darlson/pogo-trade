import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import Footer from './components/Footer'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from './redux/authReducer'

function App(props) {
  // const (user, stateUser) = useEffect
  
  return (
    <div className="App">
      App.js
      {props.location.pathname === '/' ? null : <Nav /> }
      
      {routes}
      <Footer/>
      {/* <ToastContainer /> */}
    </div>
  );
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {getUser})(withRouter(App))
