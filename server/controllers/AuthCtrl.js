const bcrypt = require("bcrypt");
require('dotenv').config()
const {SERVER_EMAIL} = process.env


module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const transporter = req.app.get('transporter')
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      alt_name,
      location,
    } = req.body;
    
    const [existingUser] = await db
    .check_user({ username, email })
    .catch((err) => res.status(500).send(err));
    
    if (existingUser && existingUser.username === username) {
      return res
      .status(409)
      .send("User already exists. Please pick another username.");
    } else if (existingUser && existingUser.email === email) {
      return res.status(409).send("Email already exists. Please log in.");
    }
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const [newUser] = await db.register_user([username, email, hash]);
      const user_id = newUser.id;
      const [newUserInfo] = await db
      .register_userinfo({
        first_name,
        last_name,
        alt_name,
        location,
        user_id,
      })
      .catch((err) => res.status(500).send(err));
      const newUserObj = { ...newUser, ...newUserInfo };
      delete newUserObj.password;
      delete newUserObj.info_id;
      delete newUserObj.role_id;
      delete newUserObj.user_id;
      
      req.session.user = newUserObj;
      
      // NODEMAILER
      const registrationEmail = {
        from: SERVER_EMAIL,
        to: email,
        subject: 'Welcome to PogoTrade!',
        html: '',
        text: "Thank you for registering and joining the PogoTrade community. We're excited to see your Shiny collection!"
      }
      transporter.sendMail(registrationEmail, (error, data) => {
        if(error){
          console.log('Nodemailer welcome email failed to send.')
        } else {
          console.log('Nodemailer welcome mail sent.')
        }
      })
      //  /nodemailer

      return res.status(200).send(req.session.user);
    } catch (err) {
      return res.status(500).send("Something went wrong.");
    }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { value, password } = req.body;

    const [user] = await db.login(value);
    if (!user) {
      return res.status(404).send("User does not exist. Please register.");
    } else {
      const [userInfo] = await db.check_userinfo([user.id]);
      const userObj = {...user, ...userInfo}
      delete userObj.password
      delete userObj.info_id;
      delete userObj.role_id;
      delete userObj.user_id;
      const authenticated = bcrypt.compareSync(password, user.password);
      if (authenticated) {
        req.session.user = userObj
        
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Username or password incorrect");
      }
    }
  },
  update: (req, res) => {
    const db = req.app.get("db");

    if (!req.session.user) {
      return res.status(401).send("Please log in");
    }
    const { newPass } = req.body;
    const { username } = req.session.user;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPass, salt);
    db.update_user(username, hash)
      .then(() => res.status(200).send("Password updated"))
      .catch((err) => res.status(500).send(err));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(404);
    }
  },
};
