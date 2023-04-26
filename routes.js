module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/restaurant', require('./routes/createRestaurant.route'));
  app.use('/restaurant', require('./routes/checkrestaurantActive.route'));
  app.use('/restaurant', require('./routes/activateRestaurant.route'));
  app.use('/restaurant', require('./routes/deactivateRestaurant.route'));
  app.use('/customer', require('./routes/customerDetails.route'));
  app.use('/customer', require('./routes/customerIncentives.route'));
  app.use('/data', require('./routes/analytics.route'));







};
