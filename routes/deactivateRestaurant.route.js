const express = require('express');
const router = new express.Router();
const deactivate = require('../services/deactivateRestaurant.js');

router.post('/deactivate', async (req, res, next) => {

  let restaurantId = req.body.id 
  // res.json({id:restaurantId});

  try {
    const result = await deactivate.DeactivateRestaurant(restaurantId);
    res.status(result.status || 200).json(result);
  }
  catch (err) {
    return res.status(500).json({
      error: err || 'Something went wrong.'
    });
  }
 
});

module.exports = router;