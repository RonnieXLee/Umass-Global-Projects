const express = require('express');
const app = express();
const items = require('./fakeDb');

app.use(express.json());

// GET /items - Get all items
app.get('/items', function(req, res) {
  return res.json(items);
});

// POST /items - Add a new item
app.post('/items', function(req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// GET /items/:name - Get a single item by name
app.get('/items/:name', function(req, res) {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    return res.json(foundItem);
  } else {
    return res.status(404).json({ error: 'Item not found' });
  }
});

// PATCH /items/:name - Update a single item by name
app.patch('/items/:name', function(req, res) {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;
    return res.json({ updated: foundItem });
  } else {
    return res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:name - Delete a single item by name
app.delete('/items/:name', function(req, res) {
  const itemName = req.params.name;
  const index = items.findIndex(item => item.name === itemName);
  if (index !== -1) {
    items.splice(index, 1);
    return res.json({ message: 'Deleted' });
  } else {
    return res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(3000, function() {
  console.log('Server starting on port 3000');
});
