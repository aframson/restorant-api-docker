const mongoose = require('mongoose');

const RestaurantShemea = new mongoose.Schema({
    name: String,
    address: String,
    openinghrs: String,
    cuisinesTypes:String,
    location:String,
    active:Boolean,
  });

  module.exports = mongoose.model('Restaurant', RestaurantShemea);
