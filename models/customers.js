const mongoose = require("mongoose");
const Joi = require("Joi");

// Create a schema for validation
const schema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(8).max(15).required(),
  isGold: Joi.boolean(),
});

// Create DB schema
const customersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  phone: { type: String, required: true, minlength: 8, maxlength: 15 },
  isGold: { type: Boolean, default: false },
});

// Create a model
const Customer = mongoose.model("Customer", customersSchema);

exports.Customer = Customer;
exports.schema = schema;
