const express = require('express');
const router = new express.Router();
// const {generateCustomerData} = require('../services/createCustomerDetails');
const CustomerData  = require('../Schema/CustomerDetailsShema')

router.post('/create', async (req, res) => {
  const newUser =  await CustomerData.create(req.body);
  newUser.save().then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;
