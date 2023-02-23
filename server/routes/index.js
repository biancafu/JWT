const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userQueries = require("../db/queries/users") ;

const jwtKey = "my_secret_key";
const jwtExpirySeconds = "3 days"; //numbers in seconds, string for other expressions

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// sign up
router.post('/signup', function (req, res, next) {
  const userData = req.body;
  console.log("sign up:", userData);

  //jwt sign asynchronously
  const token = jwt.sign({ username:userData.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds
	});
  console.log("token:", token);

  //create user in database
  userQueries.createNewUser(userData)
    .then(result => {
      //generate a jwt token send it back to front end
      res.json({ token });
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

      const token = jwt.sign({ username:result.username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
      });
    console.log("token: (login)", token);

    })
  
});

module.exports = router;
