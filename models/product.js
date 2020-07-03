var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create product schema
var productSchema = new Schema(
  {
    description: String,
    last_sold: Date,
    shelf_life: String,
    department: String,
    price: String,
    unit: String,
    xFor: String,
    cost: String
  }
);

module.exports = mongoose.model('Product', productSchema);