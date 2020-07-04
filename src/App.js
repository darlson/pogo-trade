import React, {useEffect} from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {withRouter} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {getUser} from './redux/authReducer'
// import { Burger, Menu } from './components';

function App(props) {
  // const [open, setOpen] = useState(false);
  // const (user, stateUser) = useEffect
  const dispatch = useDispatch()
  useEffect ( () => {
    dispatch(getUser())
  }, [dispatch] )
  

  return (
    <div className="App">
      {props.location.pathname === '/' ? null : <Nav /> }
      
      {routes}
      <Footer/>
      <ToastContainer />
      {/* <div>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div> */}
    </div>
  );
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {getUser})(withRouter(App))
