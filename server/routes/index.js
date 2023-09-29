const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const userQueries = require("../db/queries/users") ;
const users = require("./users.js"); //diff route

const jwtKey = "my_secret_key";
const jwtExpirySeconds = "3 days"; //numbers in seconds, string for other expressions

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// sign up
router.post('/signup', function (req, res, next) {
  const userData = req.body;
  console.log("sign up:", userData);

  //create jwt token once we get a post request
  //jwt sign asynchronously
      //(Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
    //(Synchronous) Returns the JsonWebToken as string
  const token = jwt.sign({ username:userData.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds
	});
  console.log("token:", token);

  //create user in database
  userQueries.createNewUser(userData)
    .then(result => {
      //generate a jwt token send it back to front end
      res.json({ token, "user": userData.username });
    })
    .catch(err => console.log(err));

});

router.post('/login', function(req, res) {
  const { email, password } = req.body;
  console.log(email, password)
  userQueries.getUser(email)
    .then(result => {
      console.log("login result:", result);
      if (!result) {
        return res.json({message: "user does not exist"});
      } else if(result.password !== password) {
        return res.json({message: "incorrect password"});
      }

      //if we don't return, this means we log in successfully
      //therefore sign in with token
      const token = jwt.sign({ username:result.username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
      });

      res.json({ token, user:result.username });
      console.log("token: (login)", token);

    })
  
});

//insert curr token it into database as invalid token
router.post('/signout', function(req, res) {
  const { token } = req.body;
  console.log(token)
  userQueries.createInvalidToken(token)
    .then(result => {
      res.json({ token });
      console.log("signout result:", result);
    })
  
});



// …
app.use("/users", users);

module.exports = router;
