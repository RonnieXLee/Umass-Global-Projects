const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** read file at path and print it out. */

function cat(path) {
  fs.promises.readFile(path, 'utf8')
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    });
}

/** read page at URL and print it out. */

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}
