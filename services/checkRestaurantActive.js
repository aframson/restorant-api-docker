const mongoose = require('mongoose');
const Restaurant = require('../Schema/index');

module.exports = {
  /**
  * 
  * @param restaurantId The ID of the restaurant to check 
  */
  checkRestaurantActive: async (restaurantId) => {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      return {
        status: '400',  
        data: {message:'Restaurant not found'},
      };
    }  

    if (!restaurant.active) {
      return {
        status: '400',
        data: {message:'Restaurant is not active'},
      };
    }

    return {
      status: '200',
      data: {message:'Restaurant is active'},
    };
  },
};
