const express = require('express');
const router = new express.Router();
const checkisactive = require('../services/checkRestaurantActive');

router.post('/check', async (req, res, next) => {

  let restaurantId = req.body.id 
  // res.json({id:restaurantId});

  try {
    const result = await checkisactive.checkRestaurantActive(restaurantId);
    res.status(result.status || 200).json(result.data);
  }
  catch (err) {
    return res.status(500).json({
      error: err || 'Something went wrong.'
    });
  }
 
});

module.exports = router;