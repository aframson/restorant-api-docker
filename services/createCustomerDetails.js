// const faker = require('faker');
const moment = require('moment');
const { faker } = require('@faker-js/faker');


const generateCustomerData =  async () => {
    const username = faker.name.fullName();
    const password = faker.name.fullName();
    const photo = faker.image.avatar();
    const telephone = faker.phone.phoneNumber('+48 91 ### ## ##')
    const address = faker.address.streetAddress();
    const bookings = [];
    const orders = [];
    const feedBack = [];
    const payment = [];
  
    // Generate random bookings
    for (let i = 0; i < 5; i++) {
      const bookingState = 'fulfilled';
      const bookingDate = faker.date.between(moment().subtract(1, 'months').toDate(), new Date());
      const bookingTime = moment(faker.date.between(moment(bookingDate).startOf('day').toDate(), moment(bookingDate).endOf('day').toDate())).format('HH:mm:ss');
      const bookingTable = faker.random.numeric({ min: 1, max: 10 });
      bookings.push({
        bookingState,
        bookingDate,
        bookingTime,
        bookingTable,
      });
    }
  
    // Generate random orders
    for (let i = 0; i < 5; i++) {
      const orderState = 'ordered'
      const orderDate = faker.date.between(moment().subtract(1, 'months').toDate(), new Date());
      const orderTime = moment(faker.date.between(moment(orderDate).startOf('day').toDate(), moment(orderDate).endOf('day').toDate())).format('HH:mm:ss');
      const orderTable = faker.random.numeric({ min: 1, max: 10 });
      const orderItems = [];
      const itemCount = faker.random.numeric({ min: 1, max: 5 });
      let orderTotal = 0;
      for (let j = 0; j < itemCount; j++) {
        const itemName = faker.commerce.productName();
        const itemPrice = faker.random.numeric({ min: 1, max: 100 });
        const itemQuantity = faker.random.numeric({ min: 1, max: 10 });
        orderTotal += itemPrice * itemQuantity;
        orderItems.push({
          itemName,
          itemPrice,
          itemQuantity,
        });
      }
      orders.push({
        orderState,
        orderDate,
        orderTime,
        orderTable,
        orderItems,
        orderTotal,
      });
    }
  
    // Generate random feedbacks
    for (let i = 0; i < 5; i++) {
      const feedBackDate = faker.date.between(moment().subtract(1, 'months').toDate(), new Date());
      const feedBackTime = moment(faker.date.between(moment(feedBackDate).startOf('day').toDate(), moment(feedBackDate).endOf('day').toDate())).format('HH:mm:ss');
      const feedBackRating = faker.random.numeric({ min: 1, max: 5 });
      const feedBackComment = faker.lorem.sentences();
      feedBack.push({
        feedBackDate,
        feedBackTime,
        feedBackRating,
        feedBackComment,
      });
    }
  
    // Generate random payments
 for (let i = 0; i < 5; i++) {
    const paymentDate = faker.date.between(moment().subtract(1, 'months').toDate(), new Date());
    const paymentTime = moment(faker.date.between(moment(paymentDate).startOf('day').toDate(), moment(paymentDate).endOf('day').toDate())).format('HH:mm:ss');
    const paymentAmount = faker.random.numeric({ min: 10, max: 100 });
    const paymentMethod = 'debit card'
    payment.push({
      paymentDate,
      paymentTime,
      paymentAmount,
      paymentMethod,
    });
}

    return {
        username,
        password,
        photo,
        telephone,
        address,
        bookings,
        orders,
        feedBack,
        payment,
    };
  
};


module.exports = {generateCustomerData};