const mongoose = require('mongoose');
const Restaurant = require('../Schema/index');

module.exports = {
    /**
    * 
    * @param data The Restaurant details of the application 
  
    */
    RegisterRetaurant: async (data) => {

        const {name,address,openinghrs,cuisinesTypes,location,active} = data

        const restaurant = await Restaurant.create({
            name,
            address,
            openinghrs,
            cuisinesTypes,
            location,
            active,
        });

        // check for error and save the data
        try {
            return {
                status: '200',
                data: restaurant
            };
        }
        catch (err) {
            return {
                status: '400',
                data: err
            };
        }
    },
  };
  