const express = require("express");
const router = express.Router();
const { Customer, schema } = require("../models/customers");

// Write Server application methods

// Read
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Create
router.post("/", async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  const result = schema.validate({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  customer = await customer.save();
  res.send(customer);
});

// Update
router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );

  if (!customer)
    res
      .status(404)
      .send(`The customer with the ID: ${req.params.id} is not found.`);

  res.send(customer);
});

// Delete
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    res
      .status(404)
      .send(`The customer with the ID: ${req.params.id} is not found.`);

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    res
      .status(404)
      .send(`The customer with the ID: ${req.params.id} is not found.`);

  res.send(customer);
});

module.exports = router;
