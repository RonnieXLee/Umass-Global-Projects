const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json()); // To parse JSON request body

app.post('/', async function(req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(d => 
      axios.get(`https://api.github.com/users/${d}`)
    ));

    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {  // Error handling middleware
  res.status(500).send({ error: err.message });
});

app.listen(3000);
