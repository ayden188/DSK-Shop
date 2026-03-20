const crypto = require('crypto');
const https = require('https');

const url = process.argv[2];

if (!url) {
  console.error('Please provide a URL');
  process.exit(1);
}

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let data = [];
  res.on('data', (chunk) => {
    data.push(chunk);
  });
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    const hash = crypto.createHash('sha384').update(buffer).digest('base64');
    console.log(`sha384-${hash}`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
