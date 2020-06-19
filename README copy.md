# Personal Project Pogo Shiny
## IDEA and USER:



## Features:
<img src = "./pictures/RequirementsDocument.png">

## Website colors:
<img src = "./pictures/colorHex.png">

## View/ Controller:
### Wireframe (View)
<img src = "./pictures/WireFrame.png">
<img src = "./pictures/WireFrame with Redux.png">

### Landing.js (View)
- This will be the landing page where the user will come when first visiting my website. It will show a navbar with 5 view pages to see, "Features, About, Contact, Register, SignIn." In the center view it will show a nice quote to show the importance of this site with a Sign In button or a register button below. Next, it will have a carousel that will move through the navbar giving a brief explanation into the next clickable view. Then lastly a footer with social media pages and copyright. These last two features along with the navbar will presist in the log in and register components.
<img src = "./pictures/Landing Page.png">

### SignIn.js (View) 
- This is the Sign in page where the user will be able to Sign into their already existing account. It will handle authentication along with a "cancel" option if the user wants to terminate signing in. Below is a route to the register page if the user needs to register. 
<img src = "./pictures/Sign in Page.png"> 

### Register.js (View)
- This is the Register page where the user will be able to register a new account and then be redirected back to the login component whos functionality was previously described above. This component will have similar functionality as the one above.
<img src = "./pictures/Register Page.png">

### Profile.js (View)
- Once the user is logged in, they will be directed to the profile page where they will be able to view their profile information(username, and profile pic), view the wheel chart of Relationship Goals already completed along with 5 love language buttons that will allow the user to grab a goal for the day in that chosen love language. Once they have completed a goal for the day then they can check it off which will in turn update the wheel. 

- In the example the user has clicked the "Affirmation" button and it now gets a "goal" from the database and populates the text field where is can be checked off. Notice as well a slight change for the navbar as there is no longer a "register" or "sign in" button but a home button. While the "View" image doesnt show it, there will also be a logout button.  
<img src = "./pictures/Profile Page.png">

### UpdateProfile.js (View)
- The user will access this component view by clicking the profile image in the top right corner once signed in. Here the user will be able to update their username and profile picture after filling in the required field and clicking "Update" or to cancel it by clicking "Cancel." 
<img src = "./pictures/UpdateProfile.png">

### Features.js (View)
-  This component is simple in that it will display main features to the application. Along with describing the "Why" of the application. It will help users gain a better purpose of this application and hopefully drawn them into signing up.
<img src = "./pictures/Features Page.png">

### About.js (View)
- This component will just show the user more information about the website HeartTaken and how it came to be.
<img src = "./pictures/About Page.png">


### Contact.js (View)
- The contact component will be useful in that it HAS the potential to allow users to send me emails regarding the website’s functionality. If bugs are detected or errors occur on the site this will be helpful in allowing the user to provide some simple feedback. 
<img src = "./pictures/Contact Page.png">

## Endpoints

Here I will list my URL, REST methods, and a sample of the data that is being sent or received for every endpoint in my application.

### Auth endpoints
- POST: push a new user to the database. app.post(`/auth/register`)
    ```javascript
    Recieve: req.body {
        username: 'example'
        password: 'examplepassword'
    }
    Send: {
        username: 'example',
        profile: 'http://googlePhoto/image.png'
        userId: 4
    }
    ```
- POST: push an existing user to the database. app.post(`/auth/login`)
    ```javascript
    Recieve: req.body {
        username: 'example'
        password: 'examplepassword'
    }
    Send: {
        username: 'example',
        profile: 'http://googlePhoto/image.png'
        userId: 4
    }
    ```
- GET: this will get the user from the database to login in. app.get(`/auth/user`)
    ```javascript
    //REFERENCE CODE WRITTEN OUT FOR GET
    getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(404);
    }
  },
    ```
- DELETE: Can logout of the website. app.delete(`/auth/logout`)
    ```javascript
    //REFERENCE CODE WRITTEN OUT FOR DELETE
  logout: (req, res) => {
    req.session.destroy();
    console.log(req.session)
    res.sendStatus(200);
  },
    ```
- PUT: Can update the username or profile picture. app.put(`/auth/user`)
    ```Javascript
    //REFERNECE CODE WRITTEN OUT FOR PUT
  updateProfile: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { name, img } = req.body;

    let data = await db
      .update_profile(id, name, img)
      .catch((error) => res.status(500).send(error));

    res.status(200).send(data);
  },
    ```

### Goals endpoints 
*Work in Progress...*
- PUT: The wheel chart will update when the checkbox is clicked. app.put(`/api/goal`)
    ```Javascript
    updateChart: async (req, res) => {
    console.log("hit")
    const db = req.app.get("db");
    const { id } = req.params;
    const { goal } = req.body;

    let data = await db
      .update_chart(goal)
      .catch((error) => res.status(500).send(error));

    res.status(200).send(data);
  },
    ```
- GET: This will get the Goal for the day when the button is clicked. app.get(`/api/goal`)
    ```Javascript
    getGoal: (req, res, next) => {
    const db = req.app.get("db");

    db.get_goal()
      .then((goal) => res.status(200).send(goal))
      .catch((error) => {
        res.status(500).send({ errorMessage: "Opps! Something went wrong can't get goal" });
        console.log(error);
      });
  },
    ```

- DELETE: Can logout of the website. app.delete(`/api/remove`)
    ```Javascript
    removegoal: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    ```



## Schema (Database Design):

### Roles TABLE
```SQL
CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
);

--EXAMPLE DUMMY DATA
INSERT INTO users
(name)
VALUES
('User'),
('Admin');
```

### Users TABLE
```SQL
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    role_id INT REFERENCES roles(id)
);

--EXAMPLE DUMMY DATA
INSERT INTO users
(username, password, profile_pic)
VALUES
('darls0n', 'd', 2),
('wanderlass', 'd', 1);
```
### User Info TABLE
```SQL
CREATE TABLE user_info(
    info_id SERIAL PRIMARY KEY,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    location: VARCHAR(50),
    user_id  INT REFERENCES users(id) 
);

--EXAMPLE DUMMY DATA
INSERT INTO user_info
(first_name, last_name, location, user_id)
VALUES
('David', 'Carlson', 'Utah Valley', 1);
```
### Pokemon Table
```SQL
CREATE TABLE pokemon(
    poke_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    trade BOOLEAN
    CP INT,
    user_id  INT REFERENCES users(id) 
);
INSERT INTO pokemon
(name, trade, CP, user_id)
VALUES
('Dragonite', false, 3792, 1),
('Mewtwo', true, 2920, 1),
('Sandshrew', true, null, 2);
```