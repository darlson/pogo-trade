import React from 'react'
import Axios from 'axios'

// const Profile = (props) => {
class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            newPass: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    updatePass = e => {
        e.preventDefault()
        const {username, newPass} = this.state
        Axios.put('/auth/update', {username, newPass})
        .then( res => {
            alert('Password updated')
        })
        .catch( err => {
            console.log(err)
        })
    }

    render(props) {
        return (
            <div>
                <form onSubmit={e => this.updatePass(e)}>
                    <input 
                        type='password'
                        placeholder='New Password'
                        name='newPass'
                        value={this.state.newPass}
                        onChange={e => this.handleChange(e)} />
                    <button type='submit' >Submit</button>
                </form>
            </div>
        )
    }
}

export default Profile