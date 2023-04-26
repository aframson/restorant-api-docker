const mongoose = require('mongoose');
const Restaurant = require('../Schema/index');

module.exports = {
  /**
  * 
  * @param restaurantId The ID of the restaurant to check 
  */
  DeactivateRestaurant: async (restaurantId) => {

    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      return {
        status: '400',  
        data: {message:'Restaurant not found'},
      };
    }   


    if (restaurant.active === true) {  
        try {
            const post = await Restaurant.findByIdAndUpdate(restaurantId,{active:false})
            return {
                status: '200',
                data: {message:'Restaurant deactivated successfully'},
            };

        } catch (error) { 
            return {
                status: '500',
                data: {message:error},
            };
        }
    }else{
      return {
        status: '200',
        data: {message:'Restaurant is already deactivated'},
      };
    }

  
  },
};
