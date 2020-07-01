import React from 'react'
import {Link} from 'react-router-dom'

const Footer = (props) => {
    
    return (
        <footer>
            <br />
            <br />
            <span>Version </span>
            <a href='https://github.com/darlson/pogo-trade/releases'>1.15.9.0</a>
            <span> © 2020, released under the </span>
            <a href='https://opensource.org/licenses/MIT'>MIT license</a>
            <span>  |  </span>
            <Link to='/contact'>Contact Us</Link>
            <br />
            Pokémon and Pokémon GO are copyright of The Pokémon Company, Niantic, Inc., and Nintendo. 
            <br />
            All trademarked images and names are property of their respective owners, and any such material is used on this site for educational purposes only.
        </footer>
    )
}

export default Footer