const mongoose = require('mongoose');

  const bookingSchema = new mongoose.Schema({
    bookingState: {
      type: String,
      enum: ['occupied', 'not fulfilled']
    },
    bookingDate: {
      type: Date,
      required: true
    },
    bookingTime: {
      type: String,
      required: true
    },
    bookingTable: {
      type: String,
      required: true
    }
  });
  
  const orderItemSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true
    },
    itemPrice: {
      type: Number,
      required: true
    },
    itemQuantity: {
      type: Number,
      required: true
    }
  });
  
  const orderSchema = new mongoose.Schema({
    orderState: {
      type: String,
      enum: ['ordered', 'not fulfilled']
    },
    orderDate: {
      type: Date,
      required: true
    },
    orderTime: {
      type: String,
      required: true
    },
    orderTable: {
      type: String,
      required: true
    },
    orderItems: [orderItemSchema],
    orderTotal: {
      type: Number,
      required: true
    }
  });
  
  const feedbackSchema = new mongoose.Schema({
    feedBackDate: {
      type: Date,
      required: true
    },
    feedBackTime: {
      type: String,
      required: true
    },
    feedBackRating: {
      type: Number,
      required: true
    },
    feedBackComment: {
      type: String,
      required: true
    }
  });
  
  const paymentSchema = new mongoose.Schema({
    paymentDate: {
      type: Date,
      required: true
    },
    paymentTime: {
      type: String,
      required: true
    },
    paymentAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    }
  });
  
  const CustomerDetailsShema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    },
    Address: {
      type: String,
      required: true
    },
    bookings: [bookingSchema],
    Orders: [orderSchema],
    feedBack: [feedbackSchema],
    payment: [paymentSchema]
  });
  
module.exports = mongoose.model('CustomerData', CustomerDetailsShema);
