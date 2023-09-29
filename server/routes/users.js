const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/display', function(req, res, next) {
  
  console.log("/users")
  res.send('respond with a resource');
});



module.exports = router;
