const bcrypt = require('bcrypt')

const registrationEmail = {
    from: 'pogotrade.app@gmail.com',
    to: '',
    subject: 'Welcome to Pogo Trade!',
    html: ''
}

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, email, password} = req.body
        const [user] = await db.check_user(username)
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
        const {username, email, password} = req.body
        
        const [existingUser] = await db.check_user(username)
        const [existingEmail] = await db.check_email(email)
        if (existingUser){
            return res.status(409).send('User already exists. Please pick another username.')
        } else if (existingEmail){
            return res.status(409).send('Email already exists. Please log in.')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const [newUser] = await db.register([username, email, hash])

            req.session.user = {
                userId: newUser.id,
                username: newUser.username
            }
            res.status(200).send(req.session.user)
        }
    },
    update: (req, res) => {

    },
    logout: (req, res) => {

    },
    getUser: (req, res) => {

    }

}