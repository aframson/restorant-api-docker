const express = require('express');
const router = new express.Router();
// const {generateCustomerData} = require('../services/createCustomerDetails');
const CustomerData  = require('../Schema/CustomerDetailsShema')

router.post('/incentives', async (req, res) => {


    const {username} = req.body;

    const customer = await CustomerData.findOne({ username: username });

    
    // Calculate the total spent by the customer
    const totalSpent = customer.Orders.reduce((acc, order) => acc + order.orderTotal, 0);

    // Calculate the number of bookings by the customer
    const numBookings = customer.bookings.length;

    // Calculate the average feedback rating by the customer
    const avgFeedbackRating = customer.feedBack.reduce((acc, feedback) => acc + feedback.feedBackRating, 0) / customer.feedBack.length;

    // Calculate the discount voucher based on total spent
    let discountVoucher = '';
    if (totalSpent >= 100) {
      discountVoucher = '10% off your next meal';
    } else if (totalSpent >= 50) {
      discountVoucher = '5% off your next meal';
    }

    // Calculate the free food based on number of bookings
    let freeFood = '';
    if (numBookings >= 5) {
      freeFood = 'Free appetizer on your next visit';
    }

    // Calculate the royalty points based on average feedback rating
    let royaltyPoints = 0;
    if (avgFeedbackRating >= 4) {
      royaltyPoints = Math.floor(avgFeedbackRating) * 10;
    }

    // Return the incentives as a response
    return res.send({
      discountVoucher,
      freeFood,
      royaltyPoints,
    });
  });
module.exports = router;
