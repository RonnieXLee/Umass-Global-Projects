const axios = require('axios');
const fs = require('fs');
const process = require('process');
const path = require('path');

async function getHtmlAndWriteToFile(url) {
  try {
    const response = await axios.get(url);
    const hostname = new URL(url).hostname;
    fs.writeFileSync(path.join(__dirname, hostname), response.data);
    console.log(`Wrote to ${hostname}`);
  } catch (err) {
    console.log(`Couldn't download ${url}`);
  }
}

function readUrlsAndWriteHtml(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}:`, err);
      process.exit(1);
    }

    const urls = data.split('\n');
    urls.forEach(getHtmlAndWriteToFile);
  });
}

const filename = process.argv[2];
readUrlsAndWriteHtml(filename);
