const bcrypt = require('bcrypt')

const registrationEmail = {
    from: 'pogotrade.app@gmail.com',
    to: '',
    subject: 'Welcome to Pogo Trade!',
    html: ''
}

module.exports = {
    register: async (req, res) => {
        // const sendEmail = {...registrationEmail, to: email, html: `<h2>Welcome to Pogo Trade, ${username}! We're excited to trade with you.` }
        // transporter.sendMail(sendEmail, (error, data) => {
        //     if(error){
        //         console.log(error)
        //     } else {
        //         console.log('Email sent')
        //     }
        // })
        const db = req.app.get('db')
        const {username, email, password, first_name, last_name, alt_name, location} = req.body
        
        const [existingUser] = await db.check_user({username, email})
        .catch( () => console.log('error in checking username'))
        
        if ( existingUser && existingUser.username === username ){
            return res.status(409).send('User already exists. Please pick another username.')
        } else if ( existingUser && existingUser.email === email ){
            return res.status(409).send('Email already exists. Please log in.')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const [newUser] = await db.register([username, email, hash])
            .catch( () => console.log('error in registering'))
            console.log('registered new')

            req.session.user = {
                userId: newUser.id,
                username: newUser.username
            }
            res.status(200).send(req.session.user)
        }
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, password} = req.body
        const [user] = await db.check_user({username, email})
        if (!user){
            return res.status(404).send('User does not exist. Please register.')
        } else {
            const authenticated = bcrypt.compareSync(password, user.password)
            if (authenticated) {
                req.session.user = {
                    userId: user.id,
                    username: user.username
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Username or password incorrect')
            }
        }
    },
    update: (req, res) => {
        const db = req.app.get('db')
        
        if(!req.session.user){
            return res.status(401).send('Please log in')
        }
        const {newPass} = req.body
        const {username} = req.session.user

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPass, salt)
        db.update_user(username, hash)
        .then( () => res.status(200).send('Password updated'))
        .catch( err => res.status(500).send(err))
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }

}