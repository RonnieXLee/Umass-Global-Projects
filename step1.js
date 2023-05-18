const fs = require('fs');
const process = require('process');

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

cat(process.argv[2]);
