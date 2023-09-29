const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";


/* GET users listing. */
router.post('/display', function(req, res, next) {
  const { token } = req.body;
  //verifying and returning the decoded the token
  

  //have to do this to catch error (throws error if token is not valid)
  try {
    const decoded = jwt.verify({token, jwtKey });
    console.log(decoded)
  }
  catch(err) {
    console.log("error: ", err)
  }
  // (Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.
  // (Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
  
});



module.exports = router;
