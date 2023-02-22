const express = require('express');
const router = express.Router();
const useQueries = require("../db/queries/users") ;


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// sign up
router.post('/signup', function (req, res, next) {
  const userData = req.body;
  console.log("sign up:", userData);
  useQueries.createNewUser(userData)
    .then(result => {
      //generate a jwt token send it back to front end
      res.json('user sucessfully signed up');
    })
});

module.exports = router;
