const mongoose = require('mongoose');


const username = '19231528';
const password = 'SUXzdqsIIivTL0pV'
const dbName = 'restaurants'

mongoose.connect(`mongodb+srv://${username}:${password}@comp7033.4glvdjk.mongodb.net/${dbName}`, { useNewUrlParser: true })
  .then(() => {  
    console.log('Database connected')
   })
  .catch(err => {
    console.log(err)
});

module.exports = mongoose.connection;   