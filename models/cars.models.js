const mongoose = require('mongoose');

require Company;

const carSchema = new mongoose.Schema({
    company: Company,
    model: String,
    sold: Boolean,
    price: Price,
    year: Year,
    extras: [String],
    createdAt: Created
})

const Car = mongoose.model('car', carSchema);

module.exports = Car;
