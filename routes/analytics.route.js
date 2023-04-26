const express = require('express');
const router = new express.Router();
const CustomerData = require('../Schema/CustomerDetailsShema.js')
const sentiment = require('sentiment');
router.get('/analytics', async (req, res, next) => {
    try {
        // Retrieve payment data and order data for each customer from database
        const customers = await CustomerData.find().select('payment Orders bookings feedBack');

        // Calculate average payment amount and total order taken for each customer
        const customerPaymentsAndOrders = customers.map((customer) => {
            const payments = customer.payment;  
            const orders = customer.Orders;
            const bookings = customer.bookings;
            const feedBack = customer.feedBack;
            const totalPaymentAmount = payments.reduce((acc, payment) => acc + payment.paymentAmount, 0);
            const averagePaymentAmount = totalPaymentAmount / payments.length;
            const totalOrderTaken = orders.reduce((acc, order) => acc + order.orderTotal, 0);
            const numberOfBookings = bookings.length;
         
            return { customerId: customer._id, averagePaymentAmount, totalOrderTaken, numberOfBookings  };
        });

        res.json(customerPaymentsAndOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

