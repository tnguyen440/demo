const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Define model
const restaurantSchema = new Schema({
  address: {
    building: String,
    coord: [],
    street: String,
    zipcode: String
  },
  borough: String,
  cuisine: String,
  grades: [{
    date: Date,
    grade: String,
    score: Number
  }],
  name: String,
  reastaurant_id: String
});

//Create the model class
const RestaurantModelClass = mongoose.model('restaurants', restaurantSchema);

//export the model
module.exports = RestaurantModelClass;
