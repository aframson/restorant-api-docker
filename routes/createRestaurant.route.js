const express = require('express');
const router = new express.Router();
const createRestaurant = require('../services/createRestaurant');
 
router.post('/create', async (req, res, next) => {

  let data = { 
    name: req.body.name,
    address: req.body.address,
    openinghrs: req.body.openinghrs,
    cuisinesTypes: req.body.cuisinesTypes,
    location: req.body.location,
    active:false
  };

  try {
    const result = await createRestaurant.RegisterRetaurant(data);
    res.status(result.status || 200).json(result.data);
  }
  catch (err) {
    return res.status(500).json({
      error: err || 'Something went wrong.'
    });
  }
 
});

module.exports = router;